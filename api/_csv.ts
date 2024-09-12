import express from 'express'
import { parse } from 'csv-parse'
import type { ReadableStream as WebReadableStream } from 'node:stream/web'
import { Stream, Transform } from 'stream'

const router = express.Router()

/**
 * @example
 * ```bash
 * curl -X POST -d '{ "url": "https://cdn.wsform.com/wp-content/uploads/2020/06/industry.csv" }' -H "Content-Type: application/json" http://localhost:4000/api/csv/ingest
 * ```
 */
router.post('/ingest', async (req, res) => {
  if (!req.body.url) {
    return res.status(400).send('url is required')
  }

  const { url } = req.body

  try {
    new URL(url)
  } catch (e) {
    return res.status(400).send('url is not valid')
  }

  const readStream = await fetch(url).then((r) =>
    Stream.Readable.fromWeb(r.body as WebReadableStream),
  )

  const parser = parse({
    delimiter: ',',
    columns: true,
    cast: true,
  })

  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  })

  let isFirstLine = true

  const jsonStreamTransform = new Transform({
    writableObjectMode: true,
    readableObjectMode: true,
    final(callback) {
      this.push('\n]')
      isFirstLine = true
      callback()
    },
    transform(chunk, _encoding, callback) {
      if (isFirstLine) {
        this.push('[\n')
        isFirstLine = false
      } else {
        this.push(',\n')
      }
      const obj = {}
      for (const key in chunk) {
        if (key.includes('.')) {
          const [first, second] = key.split('.')
          obj[first] = obj[first] || {}
          obj[first][second] = chunk[key]
        } else {
          obj[key] = chunk[key]
        }
      }
      this.push(JSON.stringify(obj))
      callback()
    },
  })

  readStream
    .pipe(parser)
    .pipe(jsonStreamTransform)
    .pipe(res)
    .on('error', (err) => {
      res.status(400).send(err)
    })
})

// send expense to Remote API
router.post('/send', async (req, res) => {
  if (!req.body) {
    return res.status(400).send('body is required')
  }

  const { body: { records } } = req

  if (!records || !records.length) {
    return res.status(400).send('Records are required')
  }

  const errors = []

  for (const record of records) {
    try {
      const response = await fetch('https://gateway.remote.com/v1/expenses', {
        method: 'POST',
        body: JSON.stringify({
          amount: record.amount,
          category: record.category,
          currency: record.currency,
          employment_id: record.employment_id,
          expense_date: record.expense_date,
          reviewed_at: record.reviewed_at,
          reviewer_id: record.reviewer_id,
          tax_amount: record.tax_amount,
          timezone: record.timezone,
          title: record.title,
        }),
        headers: {
          'Content-Type': 'application/json',
          authorization: req.headers.authorization,
        },
      })
      if (!response.ok) {
        console.warn('Error', response.status, response.statusText)
        errors.push({
          status: response.status,
          body: await response.text(),
        })
      }
    } catch (e) {
      errors.push({
        status: 500,
        body: e.message,
      })
    }
  }
  if (errors.length) {
    return res.status(400).send({ message: 'error', errors })
  }

  res.status(200).send({ message: 'success', errors })
})

export default router
