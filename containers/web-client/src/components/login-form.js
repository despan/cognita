import React, { Component } from 'react'

import { Form, Input, Button } from 'element-react'

class LoginForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      form: {
        username: '',
        password: ''
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeOf = this.handleChangeOf.bind(this)
  }

  handleSubmit (event) {
    const { form } = this.state

    this.props.onSubmit(form)

    event.preventDefault()
  }

  handleChangeOf (key) {
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
        onSubmit={this.handleSubmit}>

        <Form.Item label="Username">
          <Input
            name="username"
            type="text"
            value={this.state.form.username}
            onChange={this.handleChangeOf('username')}>
          </Input>
        </Form.Item>

        <Form.Item label="Password">
          <Input
            name="password"
            type="password"
            value={this.state.form.password}
            onChange={this.handleChangeOf('password')}>
          </Input>
        </Form.Item>

        <Button nativeType="submit"> Login </Button>
      </Form>
    )
  }
}

export default LoginForm
