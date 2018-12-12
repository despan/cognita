import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthNav from '../components/auth-nav'

const mapStateToProps = (state, ownProps) => ({
  user: state.user
})

const mapDispatchToProps = {}

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)

function UserHome ({ username } = {}) {
  return <h3>Welcome back, {username} !</h3>
}

function GuestHome(props) {
  return (
    <div>
      <h3>Not authenticated.</h3>
      <AuthNav/>
    </div>
  )
}

class Home extends Component {
  render () {
    const { user } = this.props

    const body = user != null
      ? <UserHome username={user.username}/>
      : <GuestHome/>

    return (
      <div>
        <h2> Home </h2>
        {body}
      </div>
    )
  }
}

export default connected(Home)
