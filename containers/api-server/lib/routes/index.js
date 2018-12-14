const Router = require('koa-router')

const signupUser = require('./signup-user')
const loginUser = require('./login-user')
const signToken = require('./sign-token')

module.exports = (opts = {}) => {
  const router = new Router()

  router
    .post('/api/users',
      signupUser(),
      signToken({ secret: 'fixit' }))

  return router.routes()
}

module.exports.signupUser = signupUser
module.exports.loginUser = loginUser
module.exports.signToken = signToken
