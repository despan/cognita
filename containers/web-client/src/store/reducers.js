import { handleActions } from 'redux-actions'

const token = handleActions({
  PUT_TOKEN (state, action) {
    return action.payload
  },
  DROP_TOKEN (state, action) {
    return null
  }
}, null)

const details = handleActions({
  PUT_TOKEN (state, action) {
    return { username: 'usr' }
  },
  DROP_TOKEN (state, action) {
    return null
  }
}, null)

export {
  token,
  details
}
