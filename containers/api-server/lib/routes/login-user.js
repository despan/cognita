const composeM = require('koa-compose')

const bcrypt = require('bcryptjs')

const R = require('ramda')

const DB = require('../db-methods')

/**
 * Helpers
 */

/**
 * Getters from ctx
 */

const emailFromReq = R.path(['request', 'body', 'email'])

/**
 * Middlewares
 */

/**
 * TODO: use JSON Schema or whatever
 */

function validate () {
  const parseErrors = ctx => {
    const { body } = ctx.request

    if (!body.email) {
      return { email: 'missing' }
    }
    if (!body.password) {
      return { password: 'missing' }
    }
  }

  return (ctx, next) => {
    const assertErros = errors => {
      if (!errors) {
        return next()
      }

      ctx.throw(422)
    }

    return Promise
      .resolve(ctx)
      .then(parseErrors)
      .then(assertErros)
  }
}

/**
 * Read user details
 */

function readUser () {
  const readFrom = db => {
    const col = db.collection('users')
    return DB.readFromBy(col, 'email')
  }

  return (ctx, next) => {
    const { db, request } = ctx

    const resolve = body => {
      if (!body) {
        ctx.throw(401)
      }

      // for tests
      if (!ctx.body) {
        ctx.body = {}
      }
      Object.assign(ctx.body, body)

      return next()
    }

    return Promise
      .resolve(ctx)
      .then(emailFromReq)
      .then(readFrom(db))
      .then(resolve)
  }
}

/**
 * Store passwords in a separate collection
 */

function verifyPassword () {
  const readFrom = db => {
    const col = db.collection('passwords')
    return DB.readFromBy(col, '_id')
  }

  return (ctx, next) => {
    const { db, request } = ctx

    const read = R.compose(
      readFrom(db),
      R.path(['body', '_id'])
    )

    const verify = ({ hash }) => {
      const { password } = request.body
      return bcrypt.compare(password, hash)
    }

    const assertVerified = isVerified => {
      if (!isVerified) {
        ctx.throw(401)
      }

      return next()
    }

    return Promise
      .resolve(ctx)
      .then(read)
      .then(verify)
      .then(assertVerified)
  }
}

/**
 * Expose composed
 */

module.exports = () => composeM(
  [ validate(),
    readUser(),
    verifyPassword() ]
)

