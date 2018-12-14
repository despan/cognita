import { createAction } from 'redux-actions'

import * as API from '../api'

export const putUser = createAction('PUT_USER')

export const fetchUser = id => dispatch => {
  return API
    .fetchUser(id)
    .then(putUser)
    .then(dispatch)
}

export const putToken = createAction('PUT_TOKEN')
export const dropToken = createAction('DROP_TOKEN')
