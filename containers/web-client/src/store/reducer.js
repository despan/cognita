import { handleActions } from 'redux-actions'

import * as R from 'ramda'

import jwtDecode from 'jwt-decode'

const PUT_TOKEN = (state, action) => {
  const token = action.payload
  const { _id } = jwtDecode(token)

  // used for API requests
  sessionStorage.setItem('cognita', token)

  return R.merge(state, { token, _id })
}

const DROP_TOKEN = (state) => {
  // used for API requests
  sessionStorage.removeItem('cognita')

  return {}
}

const PUT_USER = (state, action) => {
  const { _id } = action.payload

  const put = R.assocPath(['users', _id])

  return put(action.payload, state)
}

const initalData = {
  token: sessionStorage.getItem('cognita')
}

export default handleActions({
  PUT_TOKEN,
  DROP_TOKEN,
  PUT_USER
}, initalData)
