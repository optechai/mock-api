import express from 'express'
import util from 'util'

const router = express.Router()

router.post('/impersonate', function (req, res) {
  console.log('-------- POST /family/impersonate --------')
  console.log('request headers', req.headers)
  console.log(
    'request body',
    util.inspect(req.body, false, null, true /* enable colors */),
  )
  const response = {
    accessToken: {
      lifetimeMs: 'string',
      value: 'impersonated-token',
    },
    refresh_token: {
      lifetime_ms: 'string',
      value: 'string',
    },
    userId: 'string',
  }
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

router.get('/', function (req, res) {
  console.log('')
  console.log('-------- GET /family --------')
  console.log('request headers', req.headers)
  const response = {
    members: [
      {
        user: {
          id: 'u:Ch5BcXN2b0FMRHAyckhsVElRQjdOTExRcEJSNWQ0c2M',
          dob: '1947-07-11',
          legalName: {
            firstName: 'Jane',
            lastName: 'Doe',
          },
          address: {
            line1: '61059 Aline Gardens',
            line2: 'Apt. 260',
            city: 'New Royce',
            stateProvinceRegion: 'SC',
            zipPostalCode: '89143-4881',
            country: 'US',
            location: {
              latitude: 100.04063951254778,
              longitude: -111.90959656887135,
            },
          },
          kycStatus: 'SUCCESS',
          createdAtMs: '1710279116729',
          updatedAtMs: '1710279226984',
          autoBilling: false,
          reportCredit: true,
          ssnOnFile: 'FULL',
        },
        group: 'FAMILY_ADMIN',
        aliases: [
          {
            email: 'dev-null+HyQ0d241PLb+nv@step.com',
          },
          {
            phoneNumber: '19725555526',
          },
          {
            username: 'user01040114149950584223',
          },
          {
            userId: 'u:Ch4rN1VUYWxyL3FqaW1CMmdVV1lpZXBZYyt1WkJzcDU',
          },
        ],
        isOwner: true,
      },
      {
        user: {
          id: 'u:Ch45VFJ4VEpaSDcvamtMZWNiSDNQQnNRSThteXpFS0s',
          dob: '2006-05-17',
          legalName: {
            firstName: 'Dewayne',
            lastName: 'Bosco',
          },
          kycStatus: 'SKIPPED',
          createdAtMs: '1710279116729',
          updatedAtMs: '1710280348450',
          autoBilling: false,
          shipping: {
            address: {
              line1: '427 Colony Cove Dr',
              city: 'San Jose',
              stateProvinceRegion: 'CA',
              zipPostalCode: '95123',
              country: 'US',
              location: {
                latitude: 37.25546,
                longitude: -121.84211,
              },
            },
            isValidated: true,
          },
        },
        group: 'FAMILY_MEMBER',
        aliases: [
          {
            email: 'dev-null+njU8Im4yaehXd+nv@step.com',
          },
          {
            phoneNumber: '14045558456',
          },
          {
            username: 'user88969717888517784666',
          },
          {
            userId: 'u:Ch45VFJ4VEpaSDcvamtMZWNiSDNQQnNRSThteXpFS0s',
          },
        ],
        isOwner: false,
      },
    ],
    invites: [],
  }
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

export default router
