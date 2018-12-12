import { handleActions } from 'redux-actions'

const token = handleActions({
  PUT_TOKEN (state, action) {
    return action.payload
  },
  DEL_TOKEN (state, action) {
    return null
  }
}, null)

const details = handleActions({
  PUT_TOKEN (state, action) {
    return { username: 'usr' }
  },
  DEL_TOKEN (state, action) {
    return null
  }
}, null)

export {
  token,
  details
}
