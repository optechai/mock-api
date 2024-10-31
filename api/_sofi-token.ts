import express from 'express'
import { Lorikeet } from '@lorikeetai/node-sdk'

const router = express.Router()

const loriSdk = new Lorikeet({
  clientId: process.env.SOFI_LORIKEET_API_KEY,
  clientSecret: process.env.SOFI_LORIKEET_API_SECRET,
})

router.post('/', async (req, res) => {
  const token = await loriSdk.token.create({
    remoteId: 'very-legit-unque-id',
    firstName: 'Lori',
    lastName: 'Customer',
    email: 'al@optech.ai',
  })

  res.send(token)
})

export default router
