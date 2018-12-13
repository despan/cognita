import { createAction } from 'redux-actions'

import * as R from 'ramda'

import Axios from 'axios'

const request = Axios.create({ baseURL: '/api' })

export const putToken = createAction('PUT_TOKEN')
export const dropToken = createAction('DROP_TOKEN')

export const acquireToken = credentials => dispatch => {
  const recover = R.path(['data', 'token'])

  return request
    .post('/tokens', credentials)
    .then(recover)
    .then(putToken)
    .then(dispatch)
}
