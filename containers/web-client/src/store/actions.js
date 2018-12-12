import { createAction } from 'redux-actions'

import Axios from 'axios'

const request = Axios.create({ baseURL: '/api' })

const putToken = createAction('PUT_TOKEN', data => data.token)

export const acquireToken = credentials => dispatch => {
  return request
    .post('/tokens', credentials)
    .then(res => res.data)
    .then(putToken)
    .then(dispatch)
}
