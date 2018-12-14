const bcrypt = require('bcryptjs')

const R = require('ramda')

const DB = require('../db-methods')

/**
 * Middlewares
 */

/**
 * Read user details
 */

function readUser () {
  const readFrom = db => {
    const col = db.collection('users')
    return DB.readFromById(col)
  }

  return (ctx, next) => {
    const { db } = ctx

    const read = R.compose(
      readFrom(db),
      R.path(['params', '_id'])
    )

    const resolve = body => {
      if (!body) {
        ctx.throw(404)
      }

      ctx.body = body

      return next()
    }

    return Promise
      .resolve(ctx)
      .then(read)
      .then(resolve)
  }
}

/**
 * Expose
 */

module.exports = readUser
