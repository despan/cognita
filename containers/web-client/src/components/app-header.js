import React from 'react'
import { Link } from 'react-router-dom'

function AppHeader () {
  return (
    <header className="clearfix">
      <Link to='/' className="float-left"> Home </Link>
      <nav className="float-right">
        <ul className="horizontal">
          <li><Link to='/auth'>Authenticate</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader
