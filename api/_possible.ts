/**
 * Delete me later
 */
import { randomUUID } from 'crypto'
import express from 'express'

const app = express.Router()

app.post('/', async function (req, res) {
  console.log('-------- POST /possible --------')
  console.log('request headers', req.headers)
  console.log('request body', req.body)
  const idToken = await OktaTokenRetriever.getIdToken()
  res.send({ token: idToken })
})

export default app

// Make the above code work in typescript.

class OktaTokenRetriever {
  static DOMAIN = "possiblefinance.okta.com"
  static CLIENT_ID = "0oa25rmt7vsu1D7oT5d7"
  static REDIRECT_URI = "https://localhost:3000/okta"
  static USERNAME = "ai.agent@possiblefinance.com"
  static PASSWORD = process.env.POSSIBLE_OKTA_PASSWORD

  static async authenticate() {
    const url = `https://${OktaTokenRetriever.DOMAIN}/api/v1/authn`
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
    const payload = {
      username: OktaTokenRetriever.USERNAME,
      password: OktaTokenRetriever.PASSWORD
    }
    const response = await fetch(url, { headers, method: "POST", body: JSON.stringify(payload) })
    const responseData = await response.json()
    return responseData.sessionToken
  }

  static async authorize(sessionToken: string) {
    const url = new URL(`https://${OktaTokenRetriever.DOMAIN}/oauth2/v1/authorize`)

    const params = new URLSearchParams({
      response_type: "id_token",
      scope: "openid email",
      state: randomUUID(),
      nonce: randomUUID(),
      client_id: OktaTokenRetriever.CLIENT_ID,
      redirect_uri: OktaTokenRetriever.REDIRECT_URI,
      sessionToken: sessionToken
    })

    url.search = params.toString()

    const response = await fetch(url, { method: "GET" })
    const location = response.headers.get("location")
    const fragment = location.split("#")[1]
    const fragmentParams = new URLSearchParams(fragment)
    return fragmentParams.get("id_token")
  }

  static async getIdToken() {
    const sessionToken = await OktaTokenRetriever.authenticate()
    return OktaTokenRetriever.authorize(sessionToken)
  }
}





