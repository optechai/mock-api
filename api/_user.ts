import express from 'express'
import util from 'util'

const app = express.Router()

app.post('/', function (req, res) {
  console.log('-------- POST /user --------')
  console.log('request headers', req.headers)
  console.log(
    'request body',
    util.inspect(req.body, false, null, true /* enable colors */),
  )
  const response = {
    success: true,
    updatedShippingAddress: req.body.shippingAddress,
  }
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.get('/transactions', function (req, res) {
  console.log('')
  console.log('-------- GET /user/transactions --------')
  console.log('request headers', req.headers)
  // Generate dates
  // Date one
  const dateOne = new Date()
  dateOne.setDate(dateOne.getDate() - 1)
  dateOne.setHours(9, 0, 0, 0)
  // Date two
  const dateTwo = new Date()
  dateTwo.setDate(dateTwo.getDate() - 1)
  dateTwo.setHours(11, 0, 0, 0)
  // Date three
  const dateThree = new Date()
  dateThree.setDate(dateThree.getDate() - 2)
  dateThree.setHours(6, 0, 0, 0)

  const response = {
    transactions: [
      {
        date: dateOne,
        merchant: 'Legitimate Business, Inc',
        amount: '$100.00',
      },
      {
        date: dateTwo,
        merchant: "Shady's iTunes Gift Card Shop",
        amount: '$420.00',
      },
      {
        date: dateThree,
        merchant: "Lucky's Lunch Laboratory",
        amount: '$24.71',
      },
    ],
  }
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.post('/email', function (req, res) {
  console.log(`-------- POST /user/email --------`)
  console.log('request headers', req.headers)
  console.log(
    'request body',
    util.inspect(req.body, false, null, true /* enable colors */),
  )
  const response = { success: true }
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.get('/', function (req, res) {
  console.log('')
  console.log('-------- GET /user --------')
  console.log('request headers', req.headers)
  const response = {
    user: {
      address: {
        city: 'string',
        country: 'string',
        line1: 'string',
        line2: 'string',
        location: {
          latitude: 0,
          longitude: 0,
        },
        state_province_region: 'string',
        zip_postal_code: 'string',
      },
      auto_billing: true,
      createdAtMs: 'string',
      dob: 'string',
      id: 'string',
      kyc_errors: ['INVALID_ERROR'],
      kyc_status: 'INVALID',
      legalName: {
        firstName: 'Paul',
        lastName: 'Lastname',
      },
      monitor_credit: true,
      nickname: 'string',
      picture_url: 'string',
      report_credit: true,
      shipping: {
        address: {
          city: 'Palo Alto',
          country: 'United States',
          line1: '120 Hawthorne Ave',
          line2: '',
          location: {
            latitude: 0,
            longitude: 0,
          },
          stateProvinceRegion: 'CA',
          zipPostalCode: '94301',
        },
        is_confirmed: true,
        is_validated: true,
      },
      ssn_on_file: 'INVALID_SSN_ON_FILE',
      updated_at_ms: 'string',
    },
  }
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.post('/shipping-address', function (req, res) {
  console.log(`-------- POST /user/shipping-address --------`)
  console.log('request headers', req.headers)
  console.log(
    'request body',
    util.inspect(req.body, false, null, true /* enable colors */),
  )
  const response = { success: true }
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.get('/orders', function (req, res) {
  console.log('')
  console.log('-------- GET /user/orders --------')
  console.log('request headers', req.headers)
  const response = {
    orders: [
      {
        id: '1',
        status: 'In transit',
        estimatedDeliveryDays: '3 days',
      },
    ],
  }
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.get('/appointments', function (req, res) {
  console.log('')
  console.log('-------- GET /user/appointments --------')
  console.log('request headers', req.headers)
  const dateOne = new Date()
  dateOne.setDate(dateOne.getDate() + 1)
  dateOne.setHours(9, 0, 0, 0)
  const dateTwo = new Date()
  dateTwo.setDate(dateTwo.getDate() + 2)
  dateTwo.setHours(11, 0, 0, 0)
  const response = {
    availableSlots: [
      {
        id: '1',
        date: dateOne,
      },
      {
        id: '2',
        date: dateTwo,
      },
    ],
  }
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

export default app
