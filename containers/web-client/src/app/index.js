import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { connect } from 'react-redux'

import * as R from 'ramda'

import { dropToken } from '../store/actions'

import Header from '../components/app-header.jsx'

import AuthView from './auth'
import UserView from './user'

const mapDipatchToProps = dispatch => ({
  logoutUser (data) {
    dispatch(dropToken(data))
  }
})

const connected = connect(R.identity, mapDipatchToProps)

function App (props) {
  const { _id, token } = props

  // guard
  if (!token) {
    return <AuthView/>
  }

  // protected
  return (
    <div>
      <Header onLogout={props.logoutUser}/>
      <main>
        <Switch>
          <Route
            exact
            path='/'
            render={props => <UserView {...props} id={_id}/>}
          />
          <Route
            exact
            path='/users/:id'
            component={UserView}
          />
        </Switch>
      </main>
    </div>
  )
}

export default connected(App)
