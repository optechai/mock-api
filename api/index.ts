import 'dotenv/config'
import express from 'express'
import util from 'util'
import accounts from './accounts'
import cards1 from './cards-1'
import cards2 from './cards-2'
import cardReplaced from './card-replaced'
import userTier from './tier'
import familyRoute from './_family'
import userRoute from './_user'
import webhookRoute from './webhook'

const app = express()

app.use(
  express.json({
    verify: (req, _, buf) => {
      // @ts-expect-error
      req.rawBody = buf.toString()
    },
  }),
)

app.post('/api/fx-check', function (req, res) {
  console.log(`-------- POST /fx-check --------`)
  console.log('request headers', req.headers)
  console.log(
    'request body',
    util.inspect(req.body, false, null, true /* enable colors */),
  )
  const body = req.body

  const originalTotal = body.original_total_amount
  const convertedTotal = body.converted_total_amount
  const fxRate = body.exchange_rate_original_to_target

  const estimatedConvertedTotal = originalTotal * fxRate

  const estimatedConversionUpperBound = estimatedConvertedTotal * 1.02
  const estimatedConversionLowerBound = estimatedConvertedTotal * 0.98

  if (
    originalTotal <= estimatedConversionUpperBound &&
    originalTotal >= estimatedConversionLowerBound
  ) {
    const response = {
      result: 'conversion appears accurate, estimate is within 2% of actual',
      estimatedConvertedTotal: estimatedConvertedTotal,
      actualConvertedTotal: convertedTotal,
    }
    console.log(
      'response body',
      util.inspect(response, false, null, true /* enable colors */),
    )
    res.send(response)
  } else {
    const response = {
      result:
        'conversion appears inaccurate, estimate is more than 2% different to actual',
      estimatedConvertedTotal: estimatedConvertedTotal,
      actualConvertedTotal: convertedTotal,
    }
    console.log(
      'response body',
      util.inspect(response, false, null, true /* enable colors */),
    )
    res.send(response)
  }
})

app.post('/api/disputes/submit', function (req, res) {
  console.log(`-------- POST /disputes/submit --------`)
  console.log('request headers', req.headers)
  console.log(
    'request body',
    util.inspect(req.body, false, null, true /* enable colors */),
  )
  const response = { success: true }
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.get('/api/tier/user-tier', function (req, res) {
  console.log('')
  console.log('-------- GET /tier/user-tier --------')
  console.log('request headers', req.headers)
  const response = userTier
  console.log(
    'request body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.post('/api/appointments', function (req, res) {
  console.log('-------- POST /appointments --------')
  console.log('request headers', req.headers)
  console.log(
    'request body',
    util.inspect(req.body, false, null, true /* enable colors */),
  )
  const response = { success: true }
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.post('/api/card/replace', function (req, res) {
  console.log('-------- POST /card/replace --------')
  console.log('request headers', req.headers)
  console.log(
    'request body',
    util.inspect(req.body, false, null, true /* enable colors */),
  )
  const response = { success: true }
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.get('/api/profile', function (req, res) {
  console.log('')
  console.log('-------- GET /profile --------')
  console.log('request headers', req.headers)
  const response = {
    profile: {
      preferredName: 'John Doe',
      verifiedAliases: [
        {
          userId: 'u:123',
        },
        {
          phoneNumber: '16025559397',
        },
        {
          email: 'thisisme@mail.com',
        },
        {
          username: 'user123',
        },
      ],
      unverifiedAliases: [],
      groups: [],
      blocked: false,
      suspended: false,
      createdAtMs: '1707514571743',
    },
  }
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.post('/api/auth/login', function (req, res) {
  console.log('-------- POST /auth/login --------')
  console.log('request headers', req.headers)
  console.log(
    'request body',
    util.inspect(req.body, false, null, true /* enable colors */),
  )
  const response = { accessToken: { value: 'this-is-the-final-auth-token!' } }
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.get('/api/account', function (req, res) {
  console.log('')
  console.log('-------- GET /account --------')
  console.log('request headers', req.headers)
  const response = accounts
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.get('/api/account/:primaryAccountId/card', function (req, res) {
  const primaryAccountId = req.params.primaryAccountId
  console.log('')
  console.log(`-------- GET /account/${primaryAccountId}/card --------`)
  console.log('request headers', req.headers)
  const response = primaryAccountId === 'account-0001' ? cards1 : cards2
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.post('/api/card/:cardId/replace/shipping', function (req, res) {
  const cardId = req.params.cardId
  console.log(`-------- POST /card/${cardId}/replace/shipping --------`)
  console.log('request headers', req.headers)
  console.log(
    'request body',
    util.inspect(req.body, false, null, true /* enable colors */),
  )
  const response = cardReplaced
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.use('/api/user', userRoute)
app.use('/api/family', familyRoute)
app.use('/api/push', webhookRoute)

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})

export default app
