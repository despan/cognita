import test from 'ava'

import { MongoDBServer } from 'mongomem'

import { MongoClient, ObjectId } from 'mongodb'

import createError from 'http-errors'
import httpAssert from 'http-assert'

import * as R from 'ramda'
import * as RA from 'ramda-adjunct'

import * as Routes from '../lib/routes'

/**
 * Fixtures
 */

const USERS = [
  { email: 'a@a.com', name: 'A', password: 'passw0rd' },
  { email: 'b@b.com', name: 'B', password: 'passw0rd' }
]

/**
 * Helpers
 */

const deepMerge = R.mergeDeepWith(R.concat)

const assertErrorFor = status => t => err => {
  t.is(err.status, status, `is ${status}`)
}

const assert409 = assertErrorFor(409)

/**
 * Hooks
 */

test.before(async _ => {
  await MongoDBServer.start()
})

test.beforeEach(async t => {
  // init db
  const dbUrl = await MongoDBServer.getConnectionString()
  const client = await MongoClient.connect(dbUrl, { useNewUrlParser: true })

  const dbName = `db-${Date.now()}`
  const db = client.db(dbName)

  // populate db
  const users = db.collection('users')
  const passwords = db.collection('passwords')

  const user = USERS[1]
  await users
    .insertOne({ email: user.email })
    .then(res => {
      const _id = res.insertedId
      return passwords
        .insertOne({ _id, password: user.password })
    })

  // define ctx
  const ctx = {
    db,
    state: {},
    request: {
      body: {}
    },
    params: {},
    status: 404,
    assert: httpAssert,
    throw (...args) {
      throw createError(...args)
    }
  }

  const callWith = fn => partial => {
    const context = deepMerge(ctx, partial)
    return fn(context, RA.resolveP)
  }

  t.context = { ctx, callWith }
})

/**
 * Tests
 */

test('user create - ok', async t => {
  const { ctx } = t.context
  const call = t.context.callWith(Routes.createUser())

  const body = USERS[0]

  const partial = { request: { body } }

  const assertState = () => {
    const { user } = ctx.state

    t.not(user._id, undefined)
    t.is(user.email, body.email)
  }

  await call(partial)
    .then(assertState)
})

test('user create - conflict', async t => {
  const { ctx } = t.context
  const call = t.context.callWith(Routes.createUser())

  const body = USERS[1]

  const partial = { request: { body } }

  await t.throws(call(partial))
    .then(assert409(t))
})

test.todo('user create - bad data')
