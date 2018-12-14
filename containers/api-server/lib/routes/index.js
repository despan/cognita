const Router = require('koa-router')

const signupUser = require('./signup-user')
const loginUser = require('./login-user')
const fetchUser = require('./fetch-user')
const signToken = require('./sign-token')

module.exports = (opts = {}) => {
  const router = new Router()

  const signed = signToken({ secret: 'fixit' })

  router
    .post('/api/tokens',
      loginUser(),
      signed)
    .post('/api/users',
      signupUser(),
      signed)
    .get('/api/users/:_id',
      fetchUser())

  return router.routes()
}

module.exports.signupUser = signupUser
module.exports.loginUser = loginUser
module.exports.fetchUser = fetchUser
module.exports.signToken = signToken
