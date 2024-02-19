const { JSONPath } = require('jsonpath-plus');
var jsonpointer = require('jsonpointer');

const json = {
    "profile": {
        "verifiedAliases": [
            {
                "userId": "u:Ch5tN2djanNLSW4wQ0NUMkZWTUU2d01NOWdDTkxGdms"
            },
            {
                "phoneNumber": "16025559397"
            },
            {
                "email": "dev-null+eSoVPT3DgKLO+nv@step.com"
            },
            {
                "username": "user34989546150538856709"
            }
        ],
        "unverifiedAliases": [],
        "groups": [],
        "blocked": false,
        "suspended": false,
        "createdAtMs": "1707514571743"
    }
}
// const result = JSONPath({ path: '$.profile.verifiedAliases[?(@.email)].email', json, wrap: false });
// // const result = JSONPath({ path: '$.profile.blocked', json, wrap: false });
// console.log(result)

const inputJson = {
    shippingAddress: null
}

// const result = JSONPath({
//     json: inputJson,
//     path: '$.shippingAddress',
//     resultType: 'all',
//     callback: (_value, _what, { parent, parentProperty }) => {
//         // console.log({ parent })
//         // console.log({ parentProperty })
//         // parent[parentProperty].price = 30
//         // return parent[parentProperty] = cb(value)
//         return parent
//     },
// })

jsonpointer.set(inputJson, '/shippingAddress', 'some new value')

console.log(inputJson)