import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import 'element-theme-default'

import AppHeader from './components/app-header'

import HomeView from './views/home'
import LoginView from './views/login'
import SignupView from './views/signup'

class App extends Component {

  render() {
    return (
      <div className="App">
        <AppHeader/>
        <main>
          <Switch>
            <Route exact path='/' component={HomeView}/>
            <Route exact path='/login' component={LoginView}/>
            <Route exact path='/signup' component={SignupView}/>
          </Switch>
        </main>
      </div>
    )
  }
}

export default App
