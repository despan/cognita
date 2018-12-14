const Router = require('koa-router')

const jwt = require('koa-jwt')

const {
  signupUser,
  loginUser,
  fetchUser,
  signToken
} = require('./routes')

module.exports = function (opts = {}) {
  const router = new Router()

  const { secret } = opts

  const guarded = jwt({ secret })
  const signed = signToken({ secret })

  return router
    .post('/tokens',
      loginUser(),
      signed)
    .post('/users',
      signupUser(),
      signed)
    .get('/users/:_id',
      guarded,
      fetchUser())
}
