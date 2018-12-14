const jwt = require('jsonwebtoken')

const R = require('ramda')

/**
 * Helpers
 */

const signWith = secret => data =>
  jwt.sign(data, secret)

const payloadFrom = R.compose(
  R.pick(['_id']),
  R.prop('body')
)

/**
 * Sign a response with token
 *
 * @params {Object} opts
 * @params {String} opts.secret
 *
 * @returns {Function} - middleware
 */

function signToken (opts = {}) {
  const signed = signWith(opts.secret)

  return (ctx, next) => {
    const resolve = token => {
      ctx.status = 201
      ctx.body = { token }

      return next()
    }

    return Promise
      .resolve(ctx)
      .then(payloadFrom)
      .then(signed)
      .then(resolve)
  }
}

module.exports = signToken
