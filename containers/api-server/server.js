const { readFileSync } = require('fs')

const getenv = require('getenv')

const Koa = require('koa')

const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')

const mongodb = require('./lib/middlewares/koa-mongodb')

const routes = require('./lib/routes')

/**
 * Settings
 */

const ENV = getenv('ENV', 'development')
const PORT = getenv.int('NODE_PORT', 3000)

const JWT_SECRET = ENV === 'production'
  ? readFileSync('/run/secrets/jwt', 'utf8').trim()
  : getenv('JWT_SECRET', 'nosecret')

/**
 * Init
 */

const app = new Koa()

app
  .use(logger())
  .use(bodyparser())
  .use(mongodb())

app
  .use(routes({ secret: JWT_SECRET }))

/**
 * Bind
 */

app.listen(PORT)
