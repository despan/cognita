const { readFileSync } = require('fs')

const getenv = require('getenv')

const Koa = require('koa')

const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')

const { mongodb } = require('./lib/middlewares')

const Router = require('./lib/router')

/**
 * Settings
 */

const ENV = getenv('ENV', 'development')
const PORT = getenv.int('NODE_PORT', 3000)

const JWT_SECRET = ENV === 'production'
  ? readFileSync('/run/secrets/jwt', 'utf8').trim()
  : getenv('JWT_SECRET', 'nosecret')

const MONGODB_URL = getenv('MONGODB_URL', 'mongodb://localhost:27017/db')

/**
 * Init
 */

const app = new Koa()

const router = new Router({ secret: JWT_SECRET })

app
  .use(logger())
  .use(bodyparser())
  .use(mongodb(MONGODB_URL))
  .use(router.routes())
  .use(router.allowedMethods())

/**
 * Bind
 */

app.listen(PORT)
