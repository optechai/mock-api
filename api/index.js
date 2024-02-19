const express = require('express')
const app = express()
const util = require('util')

app.use(express.json()); // for parsing application/json

app.get('/api/user', function (req, res) {
    console.log("")
    console.log("-------- GET /user --------")
    console.log("request headers", req.headers)
    const response = {
        "shippingAddress": "123 Abc St, Sydney"
    }
    console.log("response body", util.inspect(response, false, null, true /* enable colors */))
    res.send(response)
})

app.post('/api/user', function (req, res) {
    console.log("-------- POST /user --------")
    console.log("request headers", req.headers)
    console.log("request body", util.inspect(req.body, false, null, true /* enable colors */))
    const response = { success: true, updatedShippingAddress: req.body.shippingAddress }
    console.log("response body", util.inspect(response, false, null, true /* enable colors */))
    res.send(response)
})


// app.get('/auth/profile', function (req, res) {
//     console.log("")
//     console.log("-------- GET /auth/profile --------")
//     console.log("request headers", req.headers)
//     const response = {
//         "profile": {
//             "verifiedAliases": [
//                 {
//                     "userId": "u:Ch5tN2djanNLSW4wQ0NUMkZWTUU2d01NOWdDTkxGdms"
//                 },
//                 {
//                     "phoneNumber": "16025559397"
//                 },
//                 {
//                     "email": "dev-null+eSoVPT3DgKLO+nv@step.com"
//                 },
//                 {
//                     "username": "user34989546150538856709"
//                 }
//             ],
//             "unverifiedAliases": [],
//             "groups": [],
//             "blocked": false,
//             "suspended": false,
//             "createdAtMs": "1707514571743"
//         }
//     }
//     console.log("response body", util.inspect(response, false, null, true /* enable colors */))
//     res.send(response)
// })

// app.post('/auth/login', function (req, res) {
//     console.log("-------- POST /auth/login --------")
//     console.log("request headers", req.headers)
//     console.log("request body", util.inspect(req.body, false, null, true /* enable colors */))
//     const response = { accessToken: { value: "this-is-the-final-auth-token!" } }
//     console.log("response body", util.inspect(response, false, null, true /* enable colors */))
//     res.send(response)
// })


// app.listen(4001)
module.exports = app