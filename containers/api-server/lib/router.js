const Router = require('koa-router')

const createToken = () => {
  return (ctx, next) => {
    ctx.body = { token: 'xxx' }
    return next()
  }
}

module.exports = () => {
  const router = new Router()

  router
    .post('/api/tokens', createToken())

  return router.routes()
}
