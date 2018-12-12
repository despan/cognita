import React, { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'

import HomeView from './views/home'
import LoginView from './views/login'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <ul>
              <li><Link to='/'> Home </Link></li>
              <li><Link to='/login'>Login</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path='/' component={HomeView}/>
            <Route exact path='/login' component={LoginView}/>
          </Switch>
        </main>
      </div>
    )
  }
}

export default App
