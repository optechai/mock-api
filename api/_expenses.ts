import express from 'express'

const router = express.Router()

router.post('/', async (req, res) => {
  const response = {
    originalRequestBody: req.body,
  }
  res.send(response)
})

export default router
