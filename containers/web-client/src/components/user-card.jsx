import React from 'react'

import { Card } from 'element-react'

function UserCard (props) {
  const { name, email } = props.details
  return (
    <Card
      className="box-card"
      header={
        <div>
          <span>{name}</span>
        </div>
      }
    >
      <div className="text item">{email}</div>
    </Card>
  )
}

export default UserCard
