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

    const successfulResponses = await Promise.all(
      response.map(async (res) => {
        if (res.status === 'fulfilled' && res.value.ok) {
          // sometimes the deposits API returns 200 but has empty values
          const transaction = await res.value.json()
          const transactionObject = Array.isArray(transaction)
            ? transaction[0]
            : transaction
          if (transactionObject.transaction_id.toString() === transactionId) {
            return {
              transaction: {
                user: '',
                receiver: '',
                rollup_status: '',
                withdrawn_to_wallet: '',
                sender: '',
                ...transactionObject,
              },
              transaction_type: Object.keys(apisToQuery).find(
                (key) => apisToQuery[key] === res.value.url,
              ),
            }
          }
          console.error('Transaction ID mismatch', transactionObject)
          return null
        }
        return null
      }),
    ).then((results) => results.filter((res) => res !== null))

    if (successfulResponses.length === 1) {
      console.log(
        'response',
        util.inspect(
          successfulResponses[0],
          false,
          null,
          true /* enable colors */,
        ),
      )
      res.send(successfulResponses[0])
    } else if (successfulResponses.length > 1) {
      console.log(
        'response',
        util.inspect(
          successfulResponses,
          false,
          null,
          true /* enable colors */,
        ),
      )
      throw new Error('Multiple transactions found')
    } else {
      throw new Error('Transaction not found')
    }
  } catch (error) {
    console.error(error)
    res.status(404).send({ error: error.message })
  }
})

export default app
