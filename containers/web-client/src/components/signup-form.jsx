import React, { Component } from 'react'

import { Form, Input, Button } from 'element-react'

class SignupForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      form: {
        email: '',
        name: '',
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
        labelPosition="left"
        labelWidth="100"
        model={this.state.form}
        onSubmit={this.handleSubmit}>

        <Form.Item label="Name">
          <Input
            name="name"
            type="text"
            value={this.state.form.name}
            onChange={this.handleChangeOf('name')}>
          </Input>
        </Form.Item>

        <Form.Item label="Email">
          <Input
            name="email"
            type="text"
            value={this.state.form.email}
            onChange={this.handleChangeOf('email')}>
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

        <Form.Item>
          <Button nativeType="submit">
            Signup
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default SignupForm

