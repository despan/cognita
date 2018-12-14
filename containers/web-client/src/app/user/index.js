import { connect } from 'react-redux'

import * as R from 'ramda'

import * as A from '../../store/actions'

import UserContainer from './container'

const mapStateToProps = (state, props) => {
  const id = props.id || props.match.params.id
  const user = R.path(['users', id], state)

  return { id, user }
}

const mapDipatchToProps = dispatch => ({
  putUser (data) {
    dispatch(A.putUser(data))
  }
})

const connected = connect(mapStateToProps, mapDipatchToProps)

export default connected(UserContainer)
