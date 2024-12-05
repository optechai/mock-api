import express from 'express'

const router = express.Router()


router.get('/', (request, res) => {
  console.log(request.url)
  const params = new URL(`http://${process.env.HOST ?? 'localhost'}${request.url}`).searchParams
  console.log(params)
  const date = params.get('date')
  console.log(date)
  if (!date) {
    res.send({
      error: 'Invalid Date'
    })
    return
  }
  res.send({
    formattedDate: new Date(date).toDateString()
  })
})

export default router