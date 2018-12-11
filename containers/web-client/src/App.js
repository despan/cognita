import React, { Component } from 'react'

import LoginForm from './components/login-form'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <LoginForm/>
        </header>
      </div>
    )
  }
}

export default App
