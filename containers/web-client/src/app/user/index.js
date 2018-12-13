import { connect } from 'react-redux'

import * as R from 'ramda'

import { fetchUser } from '../../store/actions'

import UserContainer from './container'

const mapStateToProps = (state, props) => {
  const id = props.id || props.match.params.id
  const user = R.path(['users', id], state)

  return { id, user }
}

const mapDipatchToProps = dispatch => ({
  fetchUser (id) {
    const a = dispatch(fetchUser(id))
    console.log(a)
  }
})

const connected = connect(mapStateToProps, mapDipatchToProps)

export default connected(UserContainer)
