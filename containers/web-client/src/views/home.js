import React, { Component } from 'react'
import { connect } from 'react-redux'

import GreetingMessage from '../components/greeting-message'

const mapStateToProps = (state, ownProps) => ({
  user: state.user
})

const mapDispatchToProps = {}

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)

class Home extends Component {
  render () {
    const { user } = this.props

    return (
      <div>
        <h2> Home </h2>
        <GreetingMessage user={user}/>
      </div>
    )
  }
}

export default connected(Home)
