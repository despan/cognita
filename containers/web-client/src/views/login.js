import React, { Component } from 'react'

import LoginForm from '../components/login-form'

class Home extends Component {
  render() {
    return (
      <div>
        <h2> Login </h2>
        <LoginForm/>
      </div>
    )
  }
}

export default Home
