/**
 * Delete me later
 */
import { randomUUID } from 'crypto'
import express from 'express'

const app = express.Router()

app.post('/', async function (req, res) {
  console.log('-------- POST /possible --------')
  console.log('request headers', req.headers)
  const idToken = await OktaTokenRetriever.getIdToken()
  res.send({ token: idToken })
})

export default app

// Make the above code work in typescript.

class OktaTokenRetriever {
  static DOMAIN = "possiblefinance.okta.com"
  static CLIENT_ID = "0oa22toso5djqZkqa5d7"
  static REDIRECT_URI = "https://iam2.possiblefinance.com/okta"
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
    console.log('authenticating: Fetching token from Okta')
    const response = await fetch(url, { headers, method: "POST", body: JSON.stringify(payload) })
    console.log('authenticating: Got response from Okta', { response })
    const responseData = await response.json()
    console.log('authenticating: Got response data from Okta', { responseData })
    return responseData.sessionToken
  }

  static async authorize(sessionToken: string) {
    const url = new URL(`https://${OktaTokenRetriever.DOMAIN}/oauth2/v1/authorize`)
    console.log('authorizing: Fetching token from Okta')

    url.searchParams.append("response_type", "id_token")
    url.searchParams.append("scope", "openid email")
    url.searchParams.append("state", randomUUID())
    url.searchParams.append("nonce", randomUUID())
    url.searchParams.append("client_id", OktaTokenRetriever.CLIENT_ID)
    url.searchParams.append("redirect_uri", OktaTokenRetriever.REDIRECT_URI)
    url.searchParams.append("sessionToken", sessionToken)
    console.log('authorizing: Fetching token from Okta', { url: url.toString() })

    const response = await fetch(url.toString(), { method: "GET", redirect: 'manual' })
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





