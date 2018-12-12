import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import 'element-theme-default'

import AppHeader from './components/app-header'

import HomeView from './views/home'
import AuthView from './views/auth'

class App extends Component {
  render() {
    return (
      <div>
        <AppHeader/>
        <main>
          <Switch>
            <Route exact path='/' component={HomeView}/>
            <Route exact path='/auth' component={AuthView}/>
          </Switch>
        </main>
      </div>
    )
  }
}

export default App
