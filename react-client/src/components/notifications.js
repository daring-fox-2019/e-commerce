import { notification } from 'antd'

export const register = {
  success: () => {
    notification.success({
      message: 'Success Registration',
      description: 'Please login to proceed',
    })
  },

  failed: (reason) => {
    notification.error({
      message: 'Failed Registration',
      description: reason,
    })
  }
}

export const login = {
  failed: () => {
    notification.error({
      message: 'Failed Login',
      description: 'Email or password is wrong',
    })
  }
}

export const auth = {
  loginRequired: () => {
    notification.warning({
      message: 'Login required',
      description: 'You must be login to do this action'
    })
  }
}

export default {
  auth,
  register,
  login
}
