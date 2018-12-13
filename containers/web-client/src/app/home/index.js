import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as R from 'ramda'

const connected = connect(R.identity)

class Home extends Component {
  render () {
    const { details } = this.props

    return (
      <div>
        <h2> Home </h2>
        <p> Welcome back, {details.username} </p>
      </div>
    )
  }
}

export default connected(Home)
