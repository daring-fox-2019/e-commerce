import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import { Form, Input, Button, Typography } from 'antd'

import notifs from '../components/notifications'
import { login, register } from '../redux/modules/auth'

const { Text } = Typography

const styles = StyleSheet.create({
  'Item__align--middle': {
    verticalAlign: 'middle'
  }
})

function AuthForm (props) {
  const emailInput = useRef(null)
  const [onSubmit, setOnSubmit] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const setter = {
    email: setEmail,
    password: setPassword
  }

  const handleChange = e => setter[e.target.name](e.target.value)

  const resetForm = () => {
    Object.keys(setter).forEach(key => setter[key](''))
    if (emailInput) emailInput.current.focus()
  }

  useEffect(resetForm, [])

  const handleSubmit = e => {
    e.preventDefault()
    const cred = { email, password }
    if (onSubmit === 'login') {
      dispatch(login(cred))
        .then(res => {
          const { user, jwtToken } = res.value.data
          localStorage.setItem('e-commerce_user', JSON.stringify(user))
          localStorage.setItem('e-commerce_token', jwtToken)
        })
        .catch(() => {
          notifs.login.failed()
          resetForm()
        })
    } else {
      dispatch(register(cred))
        .then(() => {
          notifs.register.success()
          resetForm()
        })
        .catch(err => notifs.register.failed(err.message))
    }
  }

  return (
    <Form
      layout="inline"
      style={{ lineHeight: 4 }}
      onSubmit={handleSubmit}
    >
      <Form.Item className={css(styles['Item__align--middle'])}>
        <Input
          required
          name="email"
          placeholder="email"
          value={email}
          onChange={handleChange}
          ref={emailInput}
        />
      </Form.Item>
      <Form.Item className={css(styles['Item__align--middle'])}>
        <Input
          required
          name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item className={css(styles['Item__align--middle'])}>
        <Button
          name="login"
          type="primary"
          htmlType="submit"
          onClick={() => setOnSubmit('login')}
        >
          Login
        </Button>
        <Text style={{ margin: '0 8px' }}>or</Text>
        <Button
          name="register"
          htmlType="submit"
          onClick={() => setOnSubmit('register')}
        >
          Register
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AuthForm
