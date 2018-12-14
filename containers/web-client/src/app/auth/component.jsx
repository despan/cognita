import React, { Component } from 'react'

import { Layout } from 'element-react'

import LoginForm from '../../components/login-form'
import SignupForm from '../../components/signup-form'

class Guard extends Component {
  render() {
    return (
      <div>
        <Layout.Row gutter="20">
          <Layout.Col span="10">
            <LoginForm onSubmit={this.props.loginUser}/>
          </Layout.Col>
          <Layout.Col span="10" offset="4">
            <SignupForm onSubmit={this.props.signupUser}/>
          </Layout.Col>
        </Layout.Row>
      </div>
    )
  }
}

export default Guard
