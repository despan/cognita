import React, { Component } from 'react'

import { Form, Input, Button } from 'element-react'

class LoginForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      form: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true,
            message: 'Please input email address',
            trigger: 'blur' },
          { type: 'email',
            message: 'Please input correct email address',
            trigger: 'blur,change' }
        ],
        password: [
          { required: true,
            message: 'Please input the password',
            trigger: 'blur' }
        ]
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeOf = this.handleChangeOf.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()

    const { form } = this.state

    this.refs.form.validate(valid => {
      if (valid) {
        this.props.onSubmit(form)
      } else {
        console.log('error submit!!')
        return false;
      }
    })
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
        ref="form"
        labelPosition="left"
        labelWidth="100"
        model={this.state.form}
        rules={this.state.rules}
        onSubmit={this.handleSubmit}>

        <Form.Item label="Email" prop="email">
          <Input
            name="email"
            type="text"
            value={this.state.form.email}
            onChange={this.handleChangeOf('email')}>
          </Input>
        </Form.Item>

        <Form.Item label="Password" prop="password">
          <Input
            name="password"
            type="password"
            value={this.state.form.password}
            onChange={this.handleChangeOf('password')}>
          </Input>
        </Form.Item>

        <Form.Item>
          <Button nativeType="submit"> Login </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default LoginForm

