const Koa = require('koa')

const logger = require('koa-logger')

/**
 * Init
 */

const app = new Koa()

app.use(logger())

app.use((ctx, next) => {
  ctx.body = 'ok'
  return next()
})

/**
 * Bind
 */

app.listen(process.env.NODE_PORT || 3000)
