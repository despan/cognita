import Axios from 'axios'

import * as R from 'ramda'

/**
 * Setup
 */

const request = Axios.create({ baseURL: '/api' })

request.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('cognita')

    const headers = R.merge(
      config.headers,
      { Authorization: `Bearer ${token}` }
    )

    return R.assoc('headers', headers, config)
  },
  error => Promise.reject(error)
)

/**
 * Methods
 */

function signupUser (data) {
  return request
    .post('/users/', data)
    .then(res => res.data)
}

function acquireToken (creds) {
  return request
    .post('/tokens/', creds)
    .then(res => res.data)
}

function fetchUser (id) {
  return request
    .get(`/users/${id}`)
    .then(res => res.data)
}

/**
 * Expose
 */

export default request

export {
  signupUser,
  acquireToken,
  fetchUser
}
