# Modern Treasury Node API Library

[![NPM version](https://img.shields.io/npm/v/modern-treasury.svg)](https://npmjs.org/package/modern-treasury)

The Modern Treasury Node library provides convenient access to the Modern Treasury REST API from applications written in server-side JavaScript.
It includes TypeScript definitions for all request params and response fields.

## Documentation

The API documentation can be found [here](https://docs.moderntreasury.com).

## Installation

```sh
npm install --save modern-treasury
# or
yarn add modern-treasury
```

## Usage

```js
import ModernTreasury from 'modern-treasury';

const modernTreasury = new ModernTreasury({
  apiKey: 'my api key', // defaults to process.env["MODERN_TREASURY_API_KEY"]
  organizationId: 'my-organization-ID',
});

async function main() {
  const externalAccount = await modernTreasury.externalAccounts.create({
    counterparty_id: '123',
    name: 'my bank',
  });

  console.log(externalAccount.id);
}
main().catch(console.error);
```

### Usage with TypeScript

Importing, instantiating, and interacting with the library are the same as above.
If you like, you may reference our types directly:

```ts
import ModernTreasury from 'modern-treasury';

const modernTreasury = new ModernTreasury({
  apiKey: 'my api key', // defaults to process.env["MODERN_TREASURY_API_KEY"]
  organizationId: 'my-organization-ID',
});

async function main() {
  const params: ModernTreasury.ExternalAccountCreateParams = { counterparty_id: '123', name: 'my bank' };
  const externalAccount: ModernTreasury.ExternalAccount = await modernTreasury.externalAccounts.create(
    params,
  );
}
main().catch(console.error);
```

Documentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.

## File Uploads

Request parameters that correspond to file uploads can be passed as either a `FormData.Blob` or a `FormData.File` instance.

We provide a `fileFromPath` helper function to easily create `FormData.File` instances from a given class.

```ts
import ModernTreasury, { fileFromPath } from 'modern-treasury';

const modernTreasury = new ModernTreasury();

const file = await fileFromPath('/my/file.txt');
await modernTreasury.documents.create('counterparties', '24c6b7a3-02...', { file: file });
```

## Handling errors

When the library is unable to connect to the API,
or if the API returns a non-success status code (i.e., 4xx or 5xx response),
a subclass of `APIError` will be thrown:

```ts
async function main() {
  const externalAccount = await modernTreasury.externalAccounts
    .create({ counterparty_id: 'missing' })
    .catch((err) => {
      if (err instanceof ModernTreasury.APIError) {
        console.log(err.status); // 400
        console.log(err.name); // BadRequestError

        console.log(err.headers); // {server: 'nginx', ...}
      }
    });
}
main().catch(console.error);
```

Error codes are as followed:

| Status Code | Error Type                 |
| ----------- | -------------------------- |
| 400         | `BadRequestError`          |
| 401         | `AuthenticationError`      |
| 403         | `PermissionDeniedError`    |
| 404         | `NotFoundError`            |
| 422         | `UnprocessableEntityError` |
| 429         | `RateLimitError`           |
| >=500       | `InternalServerError`      |
| N/A         | `APIConnectionError`       |

### Retries

Certain errors will be automatically retried 2 times by default, with a short exponential backoff.
Connection errors (for example, due to a network connectivity problem), 409 Conflict, 429 Rate Limit,
and >=500 Internal errors will all be retried by default.

You can use the `maxRetries` option to configure or disable this:

<!-- prettier-ignore -->
```js
// Configure the default for all requests:
const modernTreasury = new ModernTreasury({
  maxRetries: 0, // default is 2
  organizationId: 'my-organization-ID',
});

// Or, configure per-request:
modernTreasury.externalAccounts.list({
  maxRetries: 5,
});
```

### Timeouts

Requests time out after 60 seconds by default. You can configure this with a `timeout` option:

<!-- prettier-ignore -->
```ts
// Configure the default for all requests:
const modernTreasury = new ModernTreasury({
  timeout: 20 * 1000, // 20 seconds (default is 60s)
  organizationId: 'my-organization-ID',
});

// Override per-request:
modernTreasury.externalAccounts.list({ party_name: 'my bank' }, {
  timeout: 5 * 1000,
});
```

On timeout, an `APIConnectionTimeoutError` is thrown.

Note that requests which time out will be [retried twice by default](#retries).

## Auto-pagination

List methods in the ModernTreasury API are paginated.
Use `for await … of` syntax to iterate through items across all pages.

```ts
async function fetchAllExternalAccounts(params) {
  const allExternalAccounts = [];
  // Automatically fetches more pages as needed.
  for await (const externalAccount of modernTreasury.externalAccounts.list()) {
    allExternalAccounts.push(externalAccount);
  }
  return allExternalAccounts;
}
```

## Configuring an HTTP(S) Agent (e.g., for proxies)

By default, this library uses a stable agent for all http/https requests to reuse TCP connections, eliminating many TCP & TLS handshakes and shaving around 100ms off most requests.

If you would like to disable or customize this behavior, for example to use the API behind a proxy, you can pass an `httpAgent` which is used for all requests (be they http or https), for example:

<!-- prettier-ignore -->
```ts
import http from 'http';
import HttpsProxyAgent from 'https-proxy-agent';

// Configure the default for all requests:
const modernTreasury = new ModernTreasury({
  httpAgent: new HttpsProxyAgent(process.env.PROXY_URL),
  organizationId: 'my-organization-ID',
});

// Override per-request:
modernTreasury.externalAccounts.list({
  baseURL: 'http://localhost:8080/test-api',
  httpAgent: new http.Agent({ keepAlive: false }),
})
```

## Status

This package is in beta. Its internals and interfaces are not stable
and subject to change without a major semver bump;
please reach out if you rely on any undocumented behavior.

We are keen for your feedback; please email us at [sdk-feedback@moderntreasury.com](mailto:sdk-feedback@moderntreasury.com)
or open an issue with questions, bugs, or suggestions.

## Requirements

The following runtimes are supported:

- Node.js version 12 or higher.
- Deno v1.28.0 or higher (experimental).
  Use `import ModernTreasury from "npm:modern-treasury"`.

If you are interested in other runtime environments, please open or upvote an issue on Github.
