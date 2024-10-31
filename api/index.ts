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
import csvRoute from './_csv'
import expensesRoute from './_expenses'
import filesRoute from './_files'
import sofiRoute from './_sofi-token'
import webhookRoute from './webhook'
import {
  checkFXConversion,
  CheckFXConversionResponse,
} from './checkFXConversion'

const app = express()

app.use(
  express.json({
    verify: (req, _, buf) => {
      // @ts-expect-error
      req.rawBody = buf.toString()
    },
  }),
)

app.post('/api/sum', function (req, res) {
  console.log(`-------- POST /sum --------`)
  console.log('request headers', req.headers)
  console.log(
    'request body',
    util.inspect(req.body, false, null, true /* enable colors */),
  )

  // expect input like:
  // {
  //   "arrayOfNumbersToSum": ["$1.00", "$2.00", "$3.00"]
  // }

  const body = req.body

  // If we don't get the right input, don't error, just provide instructions do the AI can iterate
  if (!body.arrayOfNumbersToSum) {
    const result = {
      sum: 0,
      message: 'No numbers provided to sum.',
    }
    res.send(result)
  }
  const numbersToSum: string[] = JSON.parse(body.arrayOfNumbersToSum)
  console.log('numbersToSum', numbersToSum)

  // the body should be an array of numbers, but they're probably provided as strings
  const numbers = numbersToSum.map((n: string | number) => {
    // remove dollar signs
    if (typeof n === 'string') {
      const nCleaned = n.replace('$', '')
      // Try to convert to a number, if not possible, return 'NaN'
      try {
        return Number(nCleaned)
      } catch (e) {
        return 'NaN'
      }
    }

    return n
  })

  // Sum the values -- instead of erroring on 'NaN', just don't include in total
  const sum = numbers.reduce((acc: number, n: number) => {
    if (!isNaN(n)) {
      return acc + n
    }
    return acc
  }, 0)

  // If there are NaNs, still return 200, but provide an explanatory message so the AI can iterate on its function call
  if (numbers.includes('NaN')) {
    const result = {
      sum: sum,
      message:
        'Some of the values provided could not be converted to numbers. Please check the values and try again.',
    }

    res.send(result)
  }

  // Otherwise, return the result
  const result = {
    sum: sum,
    message: 'The sum of the numbers is calculated successfully.',
  }

  res.send(result)
})

app.post('/api/fx-check', function (req, res) {
  console.log(`-------- POST /fx-check --------`)
  console.log('request headers', req.headers)
  console.log(
    'request body',
    util.inspect(req.body, false, null, true /* enable colors */),
  )
  const body = req.body

  const originalTotal = Number(body.original_total_amount)
  const convertedTotal = Number(body.converted_total_amount)
  const fxRate = Number(body.exchange_rate_original_to_target)

  const checkResult: CheckFXConversionResponse = checkFXConversion(
    originalTotal,
    convertedTotal,
    fxRate,
  )

  console.log(
    'response body',
    util.inspect(checkResult, false, null, true /* enable colors */),
  )
  res.send(checkResult)
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
app.use('/api/csv', csvRoute)
app.use('/api/expenses', expensesRoute)
app.use('/api/files', filesRoute)
app.use('/api/token', sofiRoute)

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})

export default app
