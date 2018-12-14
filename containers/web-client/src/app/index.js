import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { connect } from 'react-redux'

import * as R from 'ramda'

import jwtDecode from 'jwt-decode'

import { dropToken } from '../store/actions'

import Header from '../components/app-header.jsx'

import AuthView from './auth'
import UserView from './user'

const mapStateToProps = (state, ownProps) => {
  return R.merge(state, ownProps)
}

const mapDispatchToProps = dispatch => ({
  logoutUser () {
    dispatch(dropToken())
  }
})

const connected = connect(mapStateToProps, mapDispatchToProps)

function App (props) {
  const { token } = props

  // guard
  if (!token) {
    return <AuthView/>
  }

  const { _id } = jwtDecode(token)

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
