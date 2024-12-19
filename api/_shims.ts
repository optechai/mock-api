import express from 'express'
import util from 'util'

const app = express.Router()

app.get('/getImmutableXTransaction', async function (req, res) {
  console.log('')
  console.log('-------- GET /getImmutableTx --------')
  console.log('request headers', req.headers)
  const transactionId = req.query.transactionId
  console.log('transactionId:', transactionId)

  const apisToQuery = {
    transfer: `https://api.x.immutable.com/v1/transfers/${transactionId}`,
    mint: `https://api.x.immutable.com/v1/mints/${transactionId}`,
    withdrawal: `https://api.x.immutable.com/v1/withdrawals/${transactionId}`,
    deposit: `https://api.x.immutable.com/v1/deposits/${transactionId}`,
  }

  const urls = Object.values(apisToQuery)

  try {
    const response = await Promise.allSettled(urls.map((url) => fetch(url)))

    const successfulResponse = response.find(
      (res) => res.status === 'fulfilled' && res.value.ok,
    )

    if (successfulResponse && successfulResponse.status === 'fulfilled') {
      const responseData = await successfulResponse.value.json()

      const url = successfulResponse.value.url

      const transactionType = Object.keys(apisToQuery).find(
        (key) => apisToQuery[key] === url,
      )

      const data = {
        transaction: {
          user: '',
          receiver: '',
          rollup_status: '',
          withdrawn_to_wallet: '',
          sender: '',
          ...(Array.isArray(responseData) ? responseData[0] : responseData),
        },
        transaction_type: transactionType,
      }

      console.log(
        'response body',
        util.inspect(data, false, null, true /* enable colors */),
      )
      res.send(data)
    } else {
      throw new Error('All API requests failed')
    }
  } catch (error) {
    console.error('All API requests failed', error)
    res.status(404).send({ error: 'Transaction not found' })
  }
})

export default app
