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
    this.onChange = this.onChange.bind(this)
    this.onChangeOf = this.onChangeOf.bind(this)
  }

  onSubmit(event) {
    console.log(event)
    submitLogin(this.state.form)
      .then(console.log)

    event.preventDefault()
  }

  onChange (key, value) {
    console.log(key, value)
    this.setState({
      form: Object.assign(this.state.form, { [key]: value })
    })
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
        onSubmit={this.onSubmit}
        labelPosition="left"
        labelWidth="100">

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
