import React, { Component } from 'react'

import { Layout, Tabs } from 'element-react'

import CredentialsForm from '../../components/credentials-form'

class Login extends Component {
  render() {
    return (
      <div>
        <Layout.Row gutter="20">
          <Layout.Col span="8" offset="8">
            <Tabs>
              <Tabs.Pane label="Login" name="login">
                <CredentialsForm
                  onSubmit={this.props.acquireToken}/>
              </Tabs.Pane>
              <Tabs.Pane label="Signup" name="signup">
                <CredentialsForm
                  onSubmit={this.props.signupUser}/>
              </Tabs.Pane>
            </Tabs>
          </Layout.Col>
        </Layout.Row>
      </div>
    )
  }
}

export default Login
