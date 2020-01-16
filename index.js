"use strict";

var jwt = require('express-jwt');
var jwksRsa = require('jwks-rsa');

/**
 * Middleware to validate a JWT
 * 
 * @param {object} options
 * @param {boolean} [options.cache=true]
 * @param {boolean} [options.rateLimit=true]
 * @param {number} [options.rpm=12] Name of the cookie to use
 * @param {string} options.domain
 * @param {string} options.audience
 * @return {function} middleware
 * @public
 */
function middleware (options) {
  var opts = options || {};
  var cache = opts.cache || true;
  var rateLimit = opts.rateLimit || true;
  var rpm = opts.rpm || 12;
  var domain = opts.domain || null;
  var audience = opts.audience || null;

  if (!domain) throw new Error('"Domain" is required.');
  if (!audience) throw new Error('"Audience" is required.');

  return jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: cache,
      rateLimit: rateLimit,
      jwksRequestsPerMinute: rpm,
      jwksUri: "https://" + domain + "/.well-known/jwks.json"
    }),
    audience: audience,
    issuer: "https://" + domain + "/",
    algorithm: ["RS256"]
  });
};

module.exports = middleware;
