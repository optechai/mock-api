import express from 'express'
import crypto from 'crypto'
import z from 'zod'

const RequestSchema = z.object({
  /**
   * Always available in the request body
   */
  link: z.string().url(),
  /** 
   * key is the payload to be processed eg 'user' or 'order' 
   */
  key: z.string(), 
  /**
   * The input data needed to process the request.
   */
  data: z.record(z.unknown()),
})

const API_URL = process.env.VERCEL_URL ? 'https://template-api-integration.vercel.app' : 'http://localhost:4000'

export type OptechRequest = z.infer<typeof RequestSchema>

const router = express.Router()

const WEBHOOK_HEADER_NAME = 'x-optech-webhook-signature'

// Swap YOUR_WEBHOOK_SIGNATURE_KEY below with your webhook signature key from:
// https://app.optech.ai/setup/webhooks
const OPTECH_SHARED_SECRET =
  process.env.OPTECH_CLIENT_SECRET || 'YOUR_WEBHOOK_SIGNATURE_KEY'
const OPTECH_CLIENT_ID = process.env.OPTECH_CLIENT_ID || 'opt_acb1234'

/**
 * Use this to decode / validate the signature provided in the header
 *
 * Generate a signature for the payload
 * @param payload - the payload to sign
 * @param secret - the secret to use to sign the payload
 * @returns the signature
 */
function generateSignature(payload: string, secret: string) {
  // Replace special characters with Unicode escape sequences
  const modifiedRequestBody = payload.replace(/’/g, '\\u2019')
  return crypto
    .createHmac('sha256', secret)
    .update(modifiedRequestBody)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

interface ProblemJSON {
  /** HTTP status code */
  status: number
  /** */
  type: string
  /** The HTTP error title */
  title: string
  /** A human-readable explanation specific to this occurrence of the problem */
  detail: string
}

// common middleware to validate the signature
router.use((req, res, next) => {
  const rawRequestBody = req['rawBody']
  console.log(req.headers)

  if (req.method === 'GET') {
    res
      .status(405)
      .header('Content-Type', 'application/problem+json')
      .send({
        status: 405,
        type: 'about:blank',
        title: 'Method not allowed',
        detail: 'The request method is not allowed',
      } satisfies ProblemJSON)
    return
  }

  console.log('-------- Authenticating --------')
  if (!rawRequestBody) {
    res
      .status(400)
      .header('Content-Type', 'application/problem+json')
      .send({
        status: 400,
        type: 'about:blank',
        title: 'Bad request',
        detail: 'The request body is empty',
      } satisfies ProblemJSON)
    return
  }

  const signature = generateSignature(rawRequestBody, OPTECH_SHARED_SECRET)
  const isValid = signature === req.headers[WEBHOOK_HEADER_NAME]

  if (!isValid) {
    console.log(
      'invalid signature',
      signature,
      req.headers[WEBHOOK_HEADER_NAME],
    )
    res
      .status(403)
      .header('Content-Type', 'application/problem+json')
      .send({
        status: 403,
        type: 'about:blank',
        title: 'Forbidden',
        detail: 'The request signature is invalid',
      } satisfies ProblemJSON)
    return
  }

  console.log('-------- POST /webhook --------')
  console.log('successful auth')
  next()
})

/**
 * GET /api/validate to validate the client token exists
 */
router.get('/validate', (req, res) => {
  console.log('-------- POST /webhook/validate --------')
  console.log('request headers', req.headers)
  console.log('request body', req.body)

  // send an accepted response
  res.status(200).send('OK')
})

/**
 * Push a new request to the API (simulated delayed response) - in practice this would be the same as the immediate response 
 * @example curl
 * ```
 * curl -X \
 * POST -H \
 * "content-type: application/json" -H \
 * "x-optech-webhook-signature: sha256 of the payload|PUBLIC_KEY
 * -d '{
 * "link": "http://localhost:3000/ingest/1234",
 *  "data": {
 *     "userId": "some-user-id"
 *  }
 * }' http://localhost:4000/api/push
 * ```
 */
router.post('/', async (req, res) => {
  console.log('-------- POST /api/push --------')
  console.log('request headers', req.headers)
  console.log('request body', req.body)


  // data is the payload to be processed (all inputs for required)
  const { link, key } = RequestSchema.parse(req.body)

  const { path } = requestMap[key]
  const requestURL = `${API_URL}${path}`
  console.log('Attempting to fetch', requestURL)
  const responseData = await fetch(requestURL).then((res) => res.json()) 

  // simulate a delay in processing the request pub/sub
  setTimeout(async () => {
    try {
      const body = JSON.stringify({
        data: responseData,
      })
      const signature = generateSignature(body, OPTECH_SHARED_SECRET)
      await fetch(link, {
        method: 'POST',
        headers: {
          // for the data
          'Content-Type': 'application/json',
          authorization: `Basic ${OPTECH_CLIENT_ID}`,
          [WEBHOOK_HEADER_NAME]: signature,
        },
        body,
      })
    } catch (error) {
      console.error(error)
    }
  }, 2000)

  res.status(202).send('Accepted')
})

const requestMap = {
  getOrders: {
    path: '/api/user/orders',
    outputKey: 'orders'
  },
  getFamilyMembers: {
    path: '/api/family',
    outputKey: 'familyMembers'
  },
  getCustomerName: {
    path: '/api/user',
    outputKey: 'customerFirstName',
  },
  retrieveCustomerEmail: {
    path: '/api/profile',
    outputKey: 'email'
  }
} as const

/**
 * Push a new request to the API (simulated immediate response)
 * @example curl
 * ```
 * curl -X \
 * POST -H \
 * "content-type: application/json" -H \
 * "authorization: Basic OPTECH_CLIENT_ID" \
 * "x-optech-webhook-signature: sha256 of the payload
 * -d '{
 * "link": "http://localhost:3000/ingest/1234",
 *  "data": {
 *     "userId": "some-user-id"
 *  }
 * }' http://localhost:4000/api/push/immediate
 * ```
 */
router.post('/immediate', async (req, res) => {
  console.log('-------- POST /api/push/immediate --------')
  console.log('request headers', req.headers)
  console.log('request body', req.body)

  // data is the payload to be processed (all inputs for required)
  const { link: _link, data: _data, key } = RequestSchema.parse(req.body)

  if (key === 'validation') {
    res.status(200).send('OK')
    return
  }

  const { path } = requestMap[key]
  const requestURL = `${API_URL}${path}`
  console.log('Attempting to fetch', requestURL)
  const responseData = await fetch(requestURL).then((res) => res.json())

  console.log('received', responseData)
  const body = JSON.stringify({
    data: responseData
  })
  console.log('sending', body)

  const signature = generateSignature(body, OPTECH_SHARED_SECRET)

  res
    .status(200)
    .header('Content-Type', 'application/json')
    .header('authorization', `Basic ${OPTECH_CLIENT_ID}`)
    .header(WEBHOOK_HEADER_NAME, signature)
    .send(body)
})

export default router
