const composeM = require('koa-compose')

const R = require('ramda')

const DB = require('../db-methods')

function ensureUnique () {
  return (ctx, next) => {
    const { db, request } = ctx

    const users = db.collection('users')

    const assertNot = isDup => {
      if (isDup) {
        ctx.throw(409)
      }

      return next()
    }

    return Promise
      .resolve(request.body.email)
      .then(DB.existsInBy(users, 'email'))
      .then(assertNot)
  }
}

function storeUser () {
  const parse = R.compose(
    R.omit(['password']),
    R.path(['request', 'body'])
  )

  const insertInto = db => {
    const col = db.collection('users')
    return DB.insertInto(col)
  }

  return (ctx, next) => {
    const insert = insertInto(ctx.db)

    const resolve = user => {
      ctx.state.user = user
      return next()
    }

    const reject = err => {
      ctx.throw(err)
    }

    return Promise
      .resolve(ctx)
      .then(parse)
      .then(insert)
      .then(resolve)
      .catch(reject)
  }
}

module.exports = () => composeM(
  [ ensureUnique(),
    storeUser() ]
)
