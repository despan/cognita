import React from 'react'
import { Link } from 'react-router-dom'

function AuthNav ({ horizontal = false } = {}) {
  const className = horizontal
    ? "horizontal"
    : ""

  return (
    <nav className={className}>
      <ul>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/signup'>Signup</Link></li>
      </ul>
    </nav>
  )
}

export default AuthNav
