import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthNav from '../components/auth-nav'

const mapStateToProps = state => state

const mapDispatchToProps = {}

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)

function UserHome ({ username } = {}) {
  return <h3>Welcome back, {username} !</h3>
}

function GuestHome (props) {
  return (
    <div>
      <h3>Not authenticated.</h3>
      <AuthNav/>
    </div>
  )
}

class Home extends Component {
  render () {
    const { token, details } = this.props

    const body = token != null
      ? <UserHome username={details.username}/>
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
