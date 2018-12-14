const { MongoClient } = require('mongodb')

const DEFAULT_OPTIONS = {
  useNewUrlParser: true
}

function mongodb (url, opts = DEFAULT_OPTIONS) {
  const connected = MongoClient.connect(url, opts)

  return async (ctx, next) => {
    const resolve = client => {
      ctx.db = client.db('cognita')
      return next()
    }

    return connected
      .catch(err => ctx.throw(503))
      .then(resolve)
  }
}

module.exports = mongodb
