import { connect } from 'react-redux'

import * as R from 'ramda'

import { acquireToken } from '../../store/actions'

import LoginView from './component'

const mapDipatchToProps = dispatch => ({
  acquireToken (data) {
    dispatch(acquireToken(data))
  },
  signupUser (data) {
    console.log('Signup not implemented')
    console.log(data)
  }
})

const connected = connect(R.identity, mapDipatchToProps)

export default connected(LoginView)
