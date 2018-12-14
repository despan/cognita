const composeM = require('koa-compose')

const bcrypt = require('bcryptjs')

const R = require('ramda')

const DB = require('../db-methods')

/**
 * Settings
 */

const SALT_ROUND = 10

/**
 * Helpers
 */

/**
 * Getters from ctx
 */

const userFromReq = R.compose(
  R.omit(['password']),
  R.path(['request', 'body'])
)

const emailFromReq = R.path(['request', 'body', 'email'])

const credsFrom = R.applySpec({
  _id: R.path(['body', '_id']),
  password: R.path(['request', 'body', 'password'])
})

/**
 * Replace password w/ hash
 */

const encrypted = data => {
  const obscure = hash => {
    const hashed = R.assoc('hash', hash, data)
    return R.dissoc('password', hashed)
  }

  return bcrypt
    .hash(data.password, SALT_ROUND)
    .then(obscure)
}

/**
 * Middlewares
 */

function validate () {
  const parseErrors = ctx => {
    const { body } = ctx.request

    if (!body.email) {
      return { email: 'missing' }
    }

    if (!body.name) {
      return { name: 'missing' }
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
 * Check db for duplicate emails
 */

function ensureUnique () {
  const existsIn = db => {
    const col = db.collection('users')
    return DB.existsInBy(col, 'email')
  }

  return (ctx, next) => {
    const { db, request } = ctx

    const assertNot = isDup => {
      if (isDup) {
        ctx.throw(409)
      }

      return next()
    }

    return Promise
      .resolve(ctx)
      .then(emailFromReq)
      .then(existsIn(db))
      .then(assertNot)
  }
}

/**
 * Save user details
 */

function storeUser () {
  const insertInto = db => {
    const col = db.collection('users')
    return DB.insertInto(col)
  }

  return (ctx, next) => {
    const { db } = ctx

    const resolve = body => {
      // for tests
      if (!ctx.body) {
        ctx.body = {}
      }
      Object.assign(ctx.body, body)

      return next()
    }

    const reject = err => {
      ctx.throw(err)
    }

    return Promise
      .resolve(ctx)
      .then(userFromReq)
      .then(insertInto(db))
      .then(resolve)
      .catch(reject)
  }
}

/**
 * Store passwords in a separate collection
 */

function storePassword () {
  const insertInto = db => {
    const col = db.collection('passwords')
    return DB.insertInto(col)
  }

  return (ctx, next) => {
    const { db } = ctx

    const resolve = () => {
      return next()
    }

    return Promise
      .resolve(ctx)
      .then(credsFrom)
      .then(encrypted)
      .then(insertInto(db))
      .then(resolve)
  }
}

/**
 * Expose composed
 */

module.exports = () => composeM(
  [ validate(),
    ensureUnique(),
    storeUser(),
    storePassword() ]
)
