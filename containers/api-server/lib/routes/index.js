const Router = require('koa-router')

const jwt = require('koa-jwt')

const signupUser = require('./signup-user')
const loginUser = require('./login-user')
const fetchUser = require('./fetch-user')
const signToken = require('./sign-token')

module.exports = (opts = {}) => {
  const router = new Router()

  const secret = 'changeit'

  const guarded = jwt({ secret })
  const signed = signToken({ secret })

  router
    .post('/tokens',
      loginUser(),
      signed)
    .post('/users',
      signupUser(),
      signed)
    .get('/users/:_id',
      guarded, fetchUser())

  return router.routes()
}

module.exports.signupUser = signupUser
module.exports.loginUser = loginUser
module.exports.fetchUser = fetchUser
module.exports.signToken = signToken
