import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { connect } from 'react-redux'

import * as R from 'ramda'

import { dropToken } from '../store/actions'

import Header from '../components/app-header.jsx'

import HomeView from './home'
import AuthView from './auth'

const mapDipatchToProps = dispatch => ({
  logoutUser (data) {
    dispatch(dropToken(data))
  }
})

const connected = connect(R.identity, mapDipatchToProps)

function App (props) {
  // guard
  if (!props.token) {
    return <AuthView/>
  }

  // protected
  return (
    <div>
      <Header onLogout={props.logoutUser}/>
      <main>
        <Switch>
          <Route exact path='/' component={HomeView}/>
        </Switch>
      </main>
    </div>
  )
}

export default connected(App)
