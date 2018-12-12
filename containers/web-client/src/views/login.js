import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Layout } from 'element-react'

import { acquireToken } from '../store/actions'

import LoginForm from '../components/login-form'

class Home extends Component {
  render() {
    return (
      <div>
        <h2> Login </h2>
        <Layout.Row gutter="20">
          <Layout.Col span="6" offset="6">
            <LoginForm onSubmit={this.props.acquireToken}/>
          </Layout.Col>
        </Layout.Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDipatchToProps = dispatch => ({
  acquireToken (creds) {
    try {
      dispatch(acquireToken(creds))
    } catch (err) {
      console.log(err)
    }
  }
})

const connected = connect(mapStateToProps, mapDipatchToProps)

export default connected(Home)
