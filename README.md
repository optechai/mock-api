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

```json
{
  "link": "https://api.optech.ai/ingest/<id>",
  "data": {
    "key": "value"
  }
}
```

The request will also have the following headers:

```http

```

You should respond to this request with a JSON object containing the data you wish to send back to the OpTech platform. The format of this response should be as follows:

```json
{
  "data": {
    "key": "value"
  }
}
```

You can respond immediately with a body response or you can respond with a `202` status code and respond later. If you respond later you should respond
within 10 seconds for low latency experiences like chat or within 10 minutes for email.

## Example implementation

See the [example implementation](api/webhook.ts) for a simple example of how to integrate with the OpTech API.
