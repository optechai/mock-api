# Template API repo

## How to integrate with the OpTech API

### Prerequisites

1. You need to have a valid client secret and client id to access the OpTech API. These are available here [OpTech API](https://app.optech.ai/setup/webhooks)
2. Once you have these add to your environment:

```env
OPTECH_CLIENT_ID=xxxxxxxxxx
OPTECH_CLIENT_SECRET=xxxxxxxxxxx
```

### How to use the API

Our API is available at [https://api.optech.ai/ingest](https://api.optech.ai/ingest) and you can use it to respond to data requests from the OpTech platform.

To allow this you'll need to configure a single endpoint on a server you own. This endpoint will be used to receive data requests from the OpTech platform. There is no requirement on
path format, but the request will always be a `POST` request with a `JSON` body as follows.

```javascript
{
  // the unique url to return the data to - only valid for 10 minutes after the request / and relevant if using an async flow
  "link": "https://api.optech.ai/ingest/<id>",
  // data requests from the OpTech platform
  "key": "value",
  "inputs": {
    "key1": "value1",
    "key2": "value2"
  }
}
```

The request will also have the following headers:

```http
x-optech-signature: <signature> // verify the request is from OpTech
content-type: application/json // the content type of the request
```

You should respond to this request with a JSON object containing the data you wish to send back to the OpTech platform. The format of this response should be as follows:

```json
{
  "data": {
    "key": "value",
    "key2": "value2"
  }
}
```

You can respond immediately with a body response and `200` or you can respond with a `202` status code and respond later. If you respond later you should respond
within 10 seconds for low latency experiences like chat or within 10 minutes for email.

If responding async you will need to include the following headers in your response.

```http
x-optech-signature: <signature> // a signature generated using OPTECH_CLIENT_SECRET from the `body` of your response.
content-type: application/json // the content type of the request
authorization: Basic OPTECH_CLIENT_ID // client id
```

## Example implementation

See the [example implementation](api/webhook.ts) for a simple example of how to integrate with the OpTech API.

### Developing locally

Add the following to your `.env` file:

```env
OPTECH_CLIENT_ID=xxxxxxxxxx
OPTECH_CLIENT_SECRET=xxxxxxxxxxx
```

Then run the following commands:

```bash
npm install
npm run dev
```
