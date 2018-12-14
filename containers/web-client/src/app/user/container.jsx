import React, { Component } from 'react'

import { Icon, Alert, Layout } from 'element-react'

import * as R from 'ramda'

import * as API from '../../api'

import UserCard from '../../components/user-card'

class UserContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      err: false,
      loading: false
    }
  }

  fetchUser () {
    const { id, putUser } = this.props

    const report = err =>
      this.setState(R.assoc('err', err))

    const stopLoading = _ =>
      this.setState(R.assoc('loading', false))

    return API
      .fetchUser(id)
      .then(putUser)
      .catch(report)
      .then(stopLoading)
  }

  componentDidMount() {
    const { id } = this.props
    return this.fetchUser(id)
  }

  render () {
    const { user } = this.props
    const { err }  = this.state

    if (!user && !err) {
      return (
        <div className="align-center">
          <Icon name="loading" />
        </div>
      )
    }

    const view = err
      ? <Alert title="Error loading user" type="error" />
      : <UserCard details={user} />

    return (
      <Layout.Row>
        <Layout.Col span="12" offset="6">
          {view}
        </Layout.Col>
      </Layout.Row>
    )
  }
}

export default UserContainer
