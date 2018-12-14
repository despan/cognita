const getenv = require('getenv')

const Koa = require('koa')

const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')

const mongodb = require('./lib/middlewares/koa-mongodb')

const routes = require('./lib/routes')

/**
 * Settings
 */

const PORT = getenv.int('NODE_PORT', 3000)

/**
 * Init
 */

const app = new Koa()

app
  .use(logger())
  .use(bodyparser())

app
  .use(mongodb())
  .use(routes())

/**
 * Bind
 */

app.listen(PORT)
