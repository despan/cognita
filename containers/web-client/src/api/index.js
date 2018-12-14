import Axios from 'axios'

const request = Axios.create({ baseURL: '/api' })

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
