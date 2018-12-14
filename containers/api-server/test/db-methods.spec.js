import test from 'ava'

import { MongoDBServer } from 'mongomem'

import { MongoClient, ObjectId } from 'mongodb'

import * as DB from '../lib/db-methods'

test.before(async _ => {
  await MongoDBServer.start()
})

test.beforeEach(async t => {
  const dbUrl = await MongoDBServer.getConnectionString()
  const client = await MongoClient.connect(dbUrl, { useNewUrlParser: true })

  const dbName = `db-${Date.now()}`
  const db = client.db(dbName)
  const col = db.collection('col')

  t.context = {
    db,
    col
  }
})

test('insertInto', async t => {
  const { col } = t.context

  const insert = DB.insertInto(col)

  t.is(typeof insert, 'function', 'signature ok')

  const assertRes = res => {
    t.not(res._id, undefined)
    t.is(res.a, 1)
  }

  await insert({ a: 1 })
    .then(assertRes)
})

test('readFromBy', async t => {
  const { col } = t.context

  const { insertedId } = await col.insertOne({ a: 1 })

  const readBy = DB.readFromBy(col)

  t.is(typeof readBy, 'function', 'signature ok')

  const assertRes = res => {
    t.not(res._id, undefined)
    t.is(res.a, 1)
  }

  await readBy('_id', insertedId)
    .then(assertRes)

  await readBy('a', 1)
    .then(assertRes)
})

test('existsInBy', async t => {
  const { col } = t.context

  const { insertedId } = await col.insertOne({ a: 1 })

  const existsBy = DB.existsInBy(col)

  t.is(typeof existsBy, 'function', 'signature ok')

  const assertExists = expected => exists =>
    t.is(exists, expected)

  await existsBy('_id', insertedId)
    .then(assertExists(true))

  await existsBy('a', 1)
    .then(assertExists(true))

  await existsBy('a', 2)
    .then(assertExists(false))
})

test('listFromBy', async t => {
  const { col } = t.context

  await col.insertMany([ { a: 1 }, { b: 2 },
                         { a: 1 }, { d: 4 } ])

  const listBy = DB.listFromBy(col)

  const assertSize = expected => res =>
    t.is(expected, res.length)

  await listBy(null, {})
    .then(assertSize(4))

  await listBy({ limit: 2 }, {})
    .then(assertSize(2))

  await listBy(null, { a: 1 })
    .then(assertSize(2))
})
