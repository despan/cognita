const { ObjectId } = require('mongodb')

const R = require('ramda')

/**
 * Inserts a single document into MongoDB.
 *
 * readFromById :: col -> str -> any -> doc
 */

const readFromBy = R.curry(
  function (col, key, val) {
    const query = { [key]: val }

    return col
      .findOne(query)
  }
)

/**
 * Inserts a single document into MongoDB.
 *
 * insertInto :: col -> obj -> doc
 */

const insertInto = R.curry(
  function (col, data) {
    const recover = R.compose(
      readFromBy(col, '_id'),
      R.prop('insertedId')
    )

    return col
      .insertOne(data)
      .then(recover)
  }
)

/**
 * Exists in a collection
 *
 * existsInBy :: col -> str -> any -> Boolean
 */

const existsInBy = R.curry(
  function (col, key, val) {
    const query = { [key]: val }
    const limit = 1

    const test = R.lt(0)

    return col
      .countDocuments(query, { limit })
      .then(test)
  }
)

/**
 * Exists in a collection
 *
 * listFromBy :: col -> obj -> query -> [doc]
 */

const listFromBy = R.curry(
  function (col, opts, query = {}) {
    return col
      .find(query, opts)
      .toArray()
  }
)

/**
 * Expose
 */

module.exports = {
  insertInto,
  existsInBy,
  readFromBy,
  listFromBy
}
