import React from 'react'

function UserGreeting (props) {
  return <h1>Welcome back, {props.username} !</h1>
}

function GuestGreeting (props) {
  return <h1>Please sign up.</h1>
}

function GreetingMessage ({ user }) {
  const greeting = user != null
    ? <UserGreeting username={user.username}/>
    : <GuestGreeting/>

    return (
      <div> {greeting} </div>
    )
}

export default GreetingMessage
