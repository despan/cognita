const Router = require('koa-router')

const jwt = require('jsonwebtoken')

const _id = 'xxx'
const token = jwt.sign({ _id }, 'CHANGEIT')

const createToken = () => {
  return (ctx, next) => {
    ctx.body = { token }
    return next()
  }
}

const readUser = () => {
  return (ctx, next) => {
    if (ctx.params.id === _id) {
      ctx.body = { _id, username: 'usr' }
    }
    return next()
  }
}

module.exports = () => {
  const router = new Router()

  router
    .post('/api/tokens', createToken())
    .post('/api/users', createToken())
    .get('/api/users/:id', readUser())

  return router.routes()
}
