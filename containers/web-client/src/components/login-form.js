import React from 'react'

import { Form, Input, Button } from 'element-react'

function submitLogin (data = {}) {
  const url = '/api/tokens'

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  }

  return fetch(url, options)
    .then(res => res.json())
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      form: {
        username: '',
        password: ''
      }
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeOf = this.onChangeOf.bind(this)
  }

  onSubmit(event) {
    submitLogin(this.state.form)
      .then(console.log)

    event.preventDefault()
  }

  onChangeOf (key) {
    return value => {
      this.setState({
        form: Object.assign(this.state.form, { [key]: value })
      })
    }
  }

  render() {
    return (
      <Form
        className="en-US"
        model={this.state.form}
        onSubmit={this.onSubmit}>

        <Form.Item label="Username">
          <Input
            name="username"
            type="text"
            value={this.state.form.username}
            onChange={this.onChangeOf('username')}>
          </Input>
        </Form.Item>

        <Form.Item label="Password">
          <Input
            name="password"
            type="password"
            value={this.state.form.password}
            onChange={this.onChangeOf('password')}>
          </Input>
        </Form.Item>

        <Button nativeType="submit"> Login </Button>
      </Form>
    )
  }
}

export default LoginForm
