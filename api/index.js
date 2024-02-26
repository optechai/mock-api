const express = require('express')
const app = express()
const util = require('util')

app.use(express.json()); // for parsing application/json

app.get('/api/user', function (req, res) {
    console.log("")
    console.log("-------- GET /user --------")
    console.log("request headers", req.headers)
    const response = {
        "shippingAddress": "120 Hawthorne Avenue, Palo Alto, CA 94301"
    }
    console.log("response body", util.inspect(response, false, null, true /* enable colors */))
    res.send(response)
})

app.get('/api/user/orders', function (req, res) {
    console.log("")
    console.log("-------- GET /user/orders --------")
    console.log("request headers", req.headers)
    const response = {
        "orders": [
            {
                "id": "1",
                "status": "In transit",
                "estimatedDeliveryDays": "3 days",
            }
        ]
    }
    console.log("response body", util.inspect(response, false, null, true /* enable colors */))
    res.send(response)
})

app.get('/api/user/appointments', function (req, res) {
    console.log("")
    console.log("-------- GET /user/appointments --------")
    console.log("request headers", req.headers)
    const dateOne = new Date()
    dateOne.setDate(dateOne.getDate() + 1)
    dateOne.setHours(9, 0, 0, 0)
    const dateTwo = new Date()
    dateTwo.setDate(dateTwo.getDate() + 2)
    dateTwo.setHours(11, 0, 0, 0)
    const response = {
        "availableSlots": [
            {
                "id": "1",
                "date": dateOne,
            },
            {
                "id": "2",
                "date": dateTwo,
            },
        ]
    }
})

app.post('/api/appointments', function (req, res) {
    console.log("-------- POST /appointments --------")
    console.log("request headers", req.headers)
    console.log("request body", util.inspect(req.body, false, null, true /* enable colors */))
    const response = { success: true }
    console.log("response body", util.inspect(response, false, null, true /* enable colors */))
    res.send(response)
})

app.post('/api/card/replace', function (req, res) {
    console.log("-------- POST /card/replace --------")
    console.log("request headers", req.headers)
    console.log("request body", util.inspect(req.body, false, null, true /* enable colors */))
    const response = { success: true }
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


app.get('/api/profile', function (req, res) {
    console.log("")
    console.log("-------- GET /profile --------")
    console.log("request headers", req.headers)
    const response = {
        "profile": {
            "verifiedAliases": [
                {
                    "userId": "u:123"
                },
                {
                    "phoneNumber": "16025559397"
                },
                {
                    "email": "thisisme@mail.com"
                },
                {
                    "username": "user123"
                }
            ],
            "unverifiedAliases": [],
            "groups": [],
            "blocked": false,
            "suspended": false,
            "createdAtMs": "1707514571743"
        }
    }
    console.log("response body", util.inspect(response, false, null, true /* enable colors */))
    res.send(response)
})

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
