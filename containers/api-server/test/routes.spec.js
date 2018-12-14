import test from 'ava'

import { MongoDBServer } from 'mongomem'

import { MongoClient, ObjectId } from 'mongodb'

import { hashSync } from 'bcryptjs'

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

const assert401 = assertErrorFor(401)
const assert409 = assertErrorFor(409)
const assert422 = assertErrorFor(422)

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
    .insertOne({ email: user.email,
                 name: user.name })
    .then(res => {
      const _id = res.insertedId
      return passwords
        .insertOne({ _id,
                     hash: hashSync(user.password, 10) })
    })

  // define ctx
  const ctx = {
    db,
    body: {},
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

test('user signup - ok', async t => {
  const { ctx, callWith } = t.context

  const body = USERS[0]
  const partial = { request: { body } }

  const call = callWith(Routes.signupUser())

  const assertState = () => {
    t.not(ctx.body._id, undefined)
    t.is(ctx.body.email, body.email)
  }

  await call(partial)
    .then(assertState)
})

test('user signup - conflict', async t => {
  const { ctx, callWith } = t.context

  const body = USERS[1]
  const partial = { request: { body } }

  const call = callWith(Routes.signupUser())

  await t.throws(call(partial))
    .then(assert409(t))
})

test('user signup - bad data', async t => {
  const { ctx, callWith } = t.context

  const call = callWith(Routes.signupUser())

  const noEmail = { name: 'A' }
  const noName = { email: 'a@a.com' }

  const of = body => ({ request: { body } })

  await t.throws(call(of(noEmail)))
    .then(assert422(t))

  await t.throws(call(of(noName)))
    .then(assert422(t))
})

test('user login - ok', async t => {
  const { ctx, callWith } = t.context

  const body = USERS[1]
  const partial = { request: { body } }

  const middleware = Routes.loginUser()
  const call = callWith(middleware)

  const assertBody = () => {
    t.pass()
  }

  await call(partial)
    .then(assertBody)
})

test('user login - unauthorized', async t => {
  const { ctx, callWith } = t.context

  const middleware = Routes.loginUser()
  const call = callWith(middleware)

  const of = body => ({ request: { body } })

  const badEmail = of(USERS[0])
  await t.throws(call(badEmail))
    .then(assert401)

  const badPass = of({ email: 'b@b.com', password: 'badPass' })
  await t.throws(call(badPass))
    .then(assert401)
})

test('user login - bad data', async t => {
  const { ctx, callWith } = t.context

  const middleware = Routes.loginUser()
  const call = callWith(middleware)

  const of = body => ({ request: { body } })

  const invalid = of({ email: 'b@b.com' })
  await t.throws(call(invalid))
})

test.skip('token sign - ok', async t => {
  const { ctx, callWith } = t.context

  const secret = 'xxx'
  const payload = { _id: 'idx' }
  const partial = { state: { user: payload } }

  const middleware = Routes.signToken({ secret })
  const call = callWith(middleware)

  const assertBody = () => {
    const { token } = ctx.body

    t.not(token, undefined)
  }

  await call(partial)
    .then(assertBody)
})
