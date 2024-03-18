const express = require('express');
const app = express();
const util = require('util');
const accounts = require('./accounts');
const cards1 = require('./cards-1');
const cards2 = require('./cards-2');
const cardReplaced = require('./card-replaced');
const userTier = require('./tier');

app.use(express.json()); // for parsing application/json

app.post('/family/impersonate', function (req, res) {
    console.log("-------- POST /family/impersonate --------");
    console.log("request headers", req.headers);
    console.log("request body", util.inspect(req.body, false, null, true /* enable colors */));
    const response = {
        "accessToken": {
            "lifetimeMs": "string",
            "value": "impersonated-token"
        },
        "refresh_token": {
            "lifetime_ms": "string",
            "value": "string"
        },
        "userId": "string"
    };
    console.log(
        "response body",
        util.inspect(response, false, null, true /* enable colors */)
    );
    res.send(response);
});

app.get("/api/family", function (req, res) {
    console.log("");
    console.log("-------- GET /family --------");
    console.log("request headers", req.headers);
    const response = {
        "members": [
            {
                "user": {
                    "id": "u:Ch5BcXN2b0FMRHAyckhsVElRQjdOTExRcEJSNWQ0c2M",
                    "dob": "1947-07-11",
                    "legalName": {
                        "firstName": "Jane",
                        "lastName": "Doe"
                    },
                    "address": {
                        "line1": "61059 Aline Gardens",
                        "line2": "Apt. 260",
                        "city": "New Royce",
                        "stateProvinceRegion": "SC",
                        "zipPostalCode": "89143-4881",
                        "country": "US",
                        "location": {
                            "latitude": 100.04063951254778,
                            "longitude": -111.90959656887135
                        }
                    },
                    "kycStatus": "SUCCESS",
                    "createdAtMs": "1710279116729",
                    "updatedAtMs": "1710279226984",
                    "autoBilling": false,
                    "reportCredit": true,
                    "ssnOnFile": "FULL"
                },
                "group": "FAMILY_ADMIN",
                "aliases": [
                    {
                        "email": "dev-null+HyQ0d241PLb+nv@step.com"
                    },
                    {
                        "phoneNumber": "19725555526"
                    },
                    {
                        "username": "user01040114149950584223"
                    },
                    {
                        "userId": "u:Ch4rN1VUYWxyL3FqaW1CMmdVV1lpZXBZYyt1WkJzcDU"
                    }
                ],
                "isOwner": true
            },
            {
                "user": {
                    "id": "u:Ch45VFJ4VEpaSDcvamtMZWNiSDNQQnNRSThteXpFS0s",
                    "dob": "2006-05-17",
                    "legalName": {
                        "firstName": "Dewayne",
                        "lastName": "Bosco"
                    },
                    "kycStatus": "SKIPPED",
                    "createdAtMs": "1710279116729",
                    "updatedAtMs": "1710280348450",
                    "autoBilling": false,
                    "shipping": {
                        "address": {
                            "line1": "427 Colony Cove Dr",
                            "city": "San Jose",
                            "stateProvinceRegion": "CA",
                            "zipPostalCode": "95123",
                            "country": "US",
                            "location": {
                                "latitude": 37.25546,
                                "longitude": -121.84211
                            }
                        },
                        "isValidated": true
                    }
                },
                "group": "FAMILY_MEMBER",
                "aliases": [
                    {
                        "email": "dev-null+njU8Im4yaehXd+nv@step.com"
                    },
                    {
                        "phoneNumber": "14045558456"
                    },
                    {
                        "username": "user88969717888517784666"
                    },
                    {
                        "userId": "u:Ch45VFJ4VEpaSDcvamtMZWNiSDNQQnNRSThteXpFS0s"
                    }
                ],
                "isOwner": false
            }
        ],
        "invites": []
    };
    console.log(
        "response body",
        util.inspect(response, false, null, true /* enable colors */)
    );
    res.send(response);
});

app.get('/api/user/transactions', function (req, res) {
    console.log('');
    console.log('-------- GET /user/transactions --------');
    console.log('request headers', req.headers);
    // Generate dates
    // Date one
    const dateOne = new Date();
    dateOne.setDate(dateOne.getDate() - 1);
    dateOne.setHours(9, 0, 0, 0);
    // Date two
    const dateTwo = new Date();
    dateTwo.setDate(dateTwo.getDate() - 1);
    dateTwo.setHours(11, 0, 0, 0);
    // Date three
    const dateThree = new Date();
    dateThree.setDate(dateThree.getDate() - 2);
    dateThree.setHours(6, 0, 0, 0);

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
    };
    console.log(
        'response body',
        util.inspect(response, false, null, true /* enable colors */)
    );
    res.send(response);
});

app.post('/api/disputes/submit', function (req, res) {
    console.log(`-------- POST /disputes/submit --------`);
    console.log('request headers', req.headers);
    console.log(
        'request body',
        util.inspect(req.body, false, null, true /* enable colors */)
    );
    const response = { success: true };
    console.log(
        'response body',
        util.inspect(response, false, null, true /* enable colors */)
    );
    res.send(response);
});

app.post('/api/user/email', function (req, res) {
    console.log(`-------- POST /user/email --------`);
    console.log('request headers', req.headers);
    console.log(
        'request body',
        util.inspect(req.body, false, null, true /* enable colors */)
    );
    const response = { success: true };
    console.log(
        'response body',
        util.inspect(response, false, null, true /* enable colors */)
    );
    res.send(response);
});

app.get('/api/user', function (req, res) {
    console.log('');
    console.log('-------- GET /user --------');
    console.log('request headers', req.headers);
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
    };
    console.log(
        'response body',
        util.inspect(response, false, null, true /* enable colors */)
    );
    res.send(response);
});

app.post('/api/user/shipping-address', function (req, res) {
    console.log(`-------- POST /user/shipping-address --------`);
    console.log('request headers', req.headers);
    console.log(
        'request body',
        util.inspect(req.body, false, null, true /* enable colors */)
    );
    const response = { success: true };
    console.log(
        'response body',
        util.inspect(response, false, null, true /* enable colors */)
    );
    res.send(response);
});

app.get('/api/user/orders', function (req, res) {
    console.log('');
    console.log('-------- GET /user/orders --------');
    console.log('request headers', req.headers);
    const response = {
        orders: [
            {
                id: '1',
                status: 'In transit',
                estimatedDeliveryDays: '3 days',
            },
        ],
    };
    console.log(
        'response body',
        util.inspect(response, false, null, true /* enable colors */)
    );
    res.send(response);
});

app.get('/api/user/appointments', function (req, res) {
    console.log('');
    console.log('-------- GET /user/appointments --------');
    console.log('request headers', req.headers);
    const dateOne = new Date();
    dateOne.setDate(dateOne.getDate() + 1);
    dateOne.setHours(9, 0, 0, 0);
    const dateTwo = new Date();
    dateTwo.setDate(dateTwo.getDate() + 2);
    dateTwo.setHours(11, 0, 0, 0);
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
    };
    console.log(
        'response body',
        util.inspect(response, false, null, true /* enable colors */)
    );
    res.send(response);
});

app.get('/api/tier/user-tier', function (req, res) {
    console.log('');
    console.log('-------- GET /tier/user-tier --------');
    console.log('request headers', req.headers);
    const response = userTier;
    console.log(
        'request body',
        util.inspect(response, false, null, true /* enable colors */)
    );
    res.send(response);
});

app.post('/api/appointments', function (req, res) {
    console.log('-------- POST /appointments --------');
    console.log('request headers', req.headers);
    console.log(
        'request body',
        util.inspect(req.body, false, null, true /* enable colors */)
    );
    const response = { success: true };
    console.log(
        'response body',
        util.inspect(response, false, null, true /* enable colors */)
    );
    res.send(response);
});

app.post('/api/card/replace', function (req, res) {
    console.log('-------- POST /card/replace --------');
    console.log('request headers', req.headers);
    console.log(
        'request body',
        util.inspect(req.body, false, null, true /* enable colors */)
    );
    const response = { success: true };
    console.log(
        'response body',
        util.inspect(response, false, null, true /* enable colors */)
    );
    res.send(response);
});

app.post('/api/user', function (req, res) {
    console.log('-------- POST /user --------');
    console.log('request headers', req.headers);
    console.log(
        'request body',
        util.inspect(req.body, false, null, true /* enable colors */)
    );
    const response = {
        success: true,
        updatedShippingAddress: req.body.shippingAddress,
    };
    console.log(
        'response body',
        util.inspect(response, false, null, true /* enable colors */)
    );
    res.send(response);
});

app.get('/api/profile', function (req, res) {
    console.log('');
    console.log('-------- GET /profile --------');
    console.log('request headers', req.headers);
    const response = {
        profile: {
            verifiedAliases: [
                {
                    userId: 'u:123',
                },
                {
                    phoneNumber: '16025559397',
                },
                {
                    email: 'thisisme@mail.com',
                },
                {
                    username: 'user123',
                },
            ],
            unverifiedAliases: [],
            groups: [],
            blocked: false,
            suspended: false,
            createdAtMs: '1707514571743',
        },
    };
    console.log(
        'response body',
        util.inspect(response, false, null, true /* enable colors */)
    );
    res.send(response);
});

app.post('/api/auth/login', function (req, res) {
    console.log("-------- POST /auth/login --------")
    console.log("request headers", req.headers)
    console.log("request body", util.inspect(req.body, false, null, true /* enable colors */))
    const response = { accessToken: { value: "this-is-the-final-auth-token!" } }
    console.log("response body", util.inspect(response, false, null, true /* enable colors */))
    res.send(response)
})

app.get('/api/account', function (req, res) {
    console.log('');
    console.log('-------- GET /account --------');
    console.log('request headers', req.headers);
    const response = accounts;
    console.log(
        'response body',
        util.inspect(response, false, null, true /* enable colors */)
    );
    res.send(response);
});

app.get('/api/account/:primaryAccountId/card', function (req, res) {
    const primaryAccountId = req.params.primaryAccountId;
    console.log('');
    console.log(`-------- GET /account/${primaryAccountId}/card --------`);
    console.log('request headers', req.headers);
    const response = primaryAccountId === 'account-0001' ? cards1 : cards2;
    console.log(
        'response body',
        util.inspect(response, false, null, true /* enable colors */)
    );
    res.send(response);
});

app.post('/api/card/:cardId/replace/shipping', function (req, res) {
    const cardId = req.params.cardId;
    console.log(`-------- POST /card/${cardId}/replace/shipping --------`);
    console.log('request headers', req.headers);
    console.log(
        'request body',
        util.inspect(req.body, false, null, true /* enable colors */)
    );
    const response = cardReplaced;
    console.log(
        'response body',
        util.inspect(response, false, null, true /* enable colors */)
    );
    res.send(response);
});

// app.listen(4001);
module.exports = app;
