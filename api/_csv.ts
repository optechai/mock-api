import express from 'express'
import { parse } from "csv-parse"
import { createReadStream } from 'fs';
import path from 'path';

const router = express.Router()

router.get('/ingest', (req, res) => {
  const readStream = createReadStream(path.join(__dirname, './cardNotReceived.csv'))

  const parser = parse({
    delimiter: ',',
  })

  res.writeHead(200, {
    'Content-Type': "text/csv",
    'Cache-Control': "no-cache",
    'Connection': "keep-alive"
  });

  readStream.pipe(parser).on('data', (row) => {
    res.write(row.join(',') + '\n')
  }).on('end', () => {
    res.end()
  })
})

export default router