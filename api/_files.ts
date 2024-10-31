import express from 'express'

const router = express.Router()

// Convert from string array of urls to array of File objects with URL
router.post('/string-to-object-multiple', async (req, res) => {
  if (!req.body) {
    return res.status(400).send('body is required')
  }

  const {
    body: { urls },
  } = req

  if (!urls || !urls.length) {
    return res.status(400).send('Urls are required')
  }

  const converted = {
    files: urls.map((url: string) => ({
      url,
    })),
  }

  res.status(200).send(converted)
})

router.post('/string-to-object-single', async (req, res) => {
  if (!req.body) {
    return res.status(400).send('body is required')
  }

  const {
    body: { url },
  } = req

  if (!url) {
    return res.status(400).send('Url is required')
  }

  const converted = {
    file: {
      url,
    },
  }

  res.status(200).send(converted)
})

export default router
