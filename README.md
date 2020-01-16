# Auth0 Express Middleware

Express middleware to validate Javascript Web Tokens.

When building an API, it may be necessary to prevent unauthorized access. The easiest way to do this is to secure the API behind a third-party authentication system, such as [Auth0](https://www.auth0.com).

## Before you install

See Auth0's docs on creating a [Server Application + API](https://auth0.com/docs/architecture-scenarios/server-api) architecture. This document explains the OAuth2 workflow necessary for full-featured logins to a server-side application and JWT authentication on the API. This middleware is intended as a drop-in middleware for Express-based APIs.

## Installing

```
$ npm install git+https://github.com/pantheon-systems/pantheon-auth0-express-middleware
```

Note that this package is NOT published on [npm.org](https://npm.org) and must be installed using the git url.

## API

```js
var express = require('express');
var jwt = require('@pantheon-systems/auth0-express-middleware');

var app = express();
var router = express.Router();

router.use(jwt({
    domain: "<YOUR_AUTH0_DOMAIN>",
    audience: "<YOUR_AUTH0_AUDIENCE>"
}));

app.use('/', router);
```

In this example, all the JWT middleware is applied as a router middleware and is enforced for all routes in the application.

### Options

The middleware function takes the following options:

| Name | Description | Required? | Default |
|------|-------------|-----------|---------|
| domain | The Auth0 domain from your configuration | Y | n/a |
| audience | The Auth0 audience from your configuration | Y | n/a |
| cache | Whether or not to cache the JWT | N | true |
| rateLimit | Whether or not to rate-limit JWT requests | N | true |
| rpm | The rate limit for new token requests, in seconds | N | 12 |

## License

[MIT](LICENSE)