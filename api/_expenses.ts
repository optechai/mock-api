import express from 'express'

const router = express.Router()

router.post('/', async (req, res) => {
  if (req.body.employment_id === 'Invalid') {
    return res.status(422).send({ errors: { employment_id: ['Invalid ID'] } })
  }
  if (req.body.employment_id === 'NotReal') {
    return res.status(404).send({ message: 'Employment not found' })
  }
  const response = {
    originalRequestBody: req.body,
  }
  res.send(response)
})

export default router
