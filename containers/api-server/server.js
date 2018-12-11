const Koa = require('koa')

const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')

const router = require('./lib/router')

/**
 * Init
 */

const app = new Koa()

app
  .use(logger())
  .use(bodyparser())

app
  .use(router())

/**
 * Bind
 */

app.listen(process.env.NODE_PORT || 3000)
