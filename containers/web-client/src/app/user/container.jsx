import React, { Component } from 'react'

class UserContainer extends Component {
  componentDidMount() {
    const { id, fetchUser } = this.props
    return fetchUser(id)
  }

  render () {
    const { id, user } = this.props

    if (!user) {
      return <div> Loading </div>
    }

    return (
      <div>
        <h2> Home </h2>
        <p> Welcome back, {id} </p>
      </div>
    )
  }
}

export default UserContainer
