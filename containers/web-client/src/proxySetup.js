var proxy = require('http-proxy-middleware')

var options = {
  target: 'http://localhost:3000',
  pathRewrite: {
    '^/api/': '/' // remove base path
  }
}

var apiProxy = proxy('/api', options)

module.exports = function (app) {
  app.use(apiProxy)
}
