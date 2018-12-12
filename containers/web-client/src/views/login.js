import React, { Component } from 'react'

import { Layout } from 'element-react'

import LoginForm from '../components/login-form'

class Home extends Component {
  render() {
    return (
      <div>
        <h2> Login </h2>
        <Layout.Row gutter="20">
          <Layout.Col span="6" offset="6">
            <LoginForm/>
          </Layout.Col>
        </Layout.Row>
      </div>
    )
  }
}

export default Home
