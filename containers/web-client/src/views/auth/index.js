import { connect } from 'react-redux'

import { acquireToken } from '../../store/actions'

import LoginView from './component'

const mapStateToProps = (state, ownProps) => Object.assign(state, ownProps)

const mapDipatchToProps = dispatch => ({
  acquireToken (data) {
    dispatch(acquireToken(data))
  },
  signupUser (data) {
    console.log('Signup not implemented')
    console.log(data)
  }
})

const connected = connect(mapStateToProps, mapDipatchToProps)

export default connected(LoginView)
