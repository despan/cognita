import { connect } from 'react-redux'

import * as A from '../../store/actions'

import * as API from '../../api'

import LoginView from './component'

const mapStateToProps = (state, ownProps) => {
  return ownProps
}

const mapDipatchToProps = dispatch => ({
  loginUser (credentials) {
    const resolve = res => {
      const { token } = res
      dispatch(A.putToken(token))
    }

    return API
      .acquireToken(credentials)
      .then(resolve)
  },
  signupUser (details) {
    const resolve = res => {
      const { token } = res
      dispatch(A.putToken(token))
    }

    return API
      .signupUser(details)
      .then(resolve)
  }
})

const connected = connect(mapStateToProps, mapDipatchToProps)

export default connected(LoginView)
