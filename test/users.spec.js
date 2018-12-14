import test from 'ava'

import Axios from 'axios'

import jwtDecode from 'jwt-decode'

const SESSION = Date.now()

const USER = {
  email: `mail-${SESSION}@gmail.com`,
  name: 'random',
  password: 'random'
}

const request = Axios.create({ baseURL: 'http://localhost:8080/api' })

test.serial('cycle', async t => {
  const { token } = await request
    .post('/users', USER)
    .then(res => res.data)

  const { _id } = jwtDecode(token)

  const userUri = `/users/${_id}`

  await t.throws(request.get(userUri))

  const headers = {
    Authorization: `Bearer ${token}`
  }

  const user = await request
    .get(`/users/${_id}`, { headers })
    .then(res => res.data)

  t.is(user.email, USER.email)
})
