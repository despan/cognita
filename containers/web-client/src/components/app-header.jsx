import React from 'react'
import { Link } from 'react-router-dom'

import { Button, Menu } from 'element-react'

function Header ({ onLogout }) {
  return (
    <header className="navbar clearfix">
      <Link to='/' className="float-left">
        <Button type="text" > Home </Button>
      </Link>
      <Button
        className="float-right"
        type="text"
        onClick={onLogout}>
        Logout
      </Button>
    </header>
  )
}

export default Header

