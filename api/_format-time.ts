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
  const today = new Date()
  res.send({
    formattedDate: new Date(date).toDateString(),
    context: {
      today: today.toDateString(),
      tonight:  today.toDateString(),
      yesterday: new Date(new Date().setDate(today.getDate() - 1)).toDateString(),
      tomorrow: new Date(new Date().setDate(today.getDate() + 1)).toDateString(),
      next_week: new Date(new Date().setDate(today.getDate() + 7)).toDateString(),
    },
    week: {
      this_monday: new Date(new Date().setDate(today.getDate() + (1 - today.getDay() + 7) % 7)).toDateString(),
      this_tuesday: new Date(new Date().setDate(today.getDate() + (2 - today.getDay() + 7) % 7)).toDateString(),
      this_wednesday: new Date(new Date().setDate(today.getDate() + (3 - today.getDay() + 7) % 7)).toDateString(),
      this_thursday: new Date(new Date().setDate(today.getDate() + (4 - today.getDay() + 7) % 7)).toDateString(),
      this_friday: new Date(new Date().setDate(today.getDate() + (5 - today.getDay() + 7) % 7)).toDateString(),
      this_saturday: new Date(new Date().setDate(today.getDate() + (6 - today.getDay() + 7) % 7)).toDateString(),
      this_sunday: new Date(new Date().setDate(today.getDate() + (0 - today.getDay() + 7) % 7)).toDateString(),
    }
  })
})

export default router