import api from '../../api'

export const LOGOUT = 'e-commerce/auth/LOGOUT'
export const LOGIN = 'e-commerce/auth/LOGIN'
export const LOGIN_FULFILLED = 'e-commerce/auth/LOGIN_FULFILLED'
export const REGISTER = 'e-commerce/auth/REGISTER'
export const REGISTER_FULFILLED = 'e-commerce/auth/REGISTER_FULFILLED'
export const SET = 'e-commerce/auth/SET'

export const logout = () => {
  return {
    type: LOGOUT
  }
}

export const login = cred => {
  return {
    type: LOGIN,
    payload: api.post('/auth/login', cred)
  }
}

export const register = cred => {
  return {
    type: REGISTER,
    payload: api.post('/auth/register', cred)
  }
}

export const setAuth = payload => {
  return {
    type: SET,
    payload
  }
}

const initialState = {
  user: JSON.parse(localStorage.getItem('e-commerce_user')) || {},
  token: localStorage.getItem('e-commerce_token') || ''
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case LOGOUT:
      return { user: {}, token: '' }
    case LOGIN_FULFILLED:
      let { user, jwtToken } = action.payload.data
      return {
        user,
        token: jwtToken
      }
    case SET:
      return action.payload
    default:
      return state
  }
}
