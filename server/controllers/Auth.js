const UserModel = require('../models/User')
const { createToken } = require('../helpers/auth')

class Auth {
  static register (req, res) {
    let { email, password } = req.body

    UserModel
      .create({ email, password })
      .then(user => {
        res.status(201).json({
          user: {
            _id: user._id,
            email: user.email
          }
        })
      })
      .catch(err => {
        if (err.name === 'ValidationError') {
          res.status(422).json({
            message: err.errors[Object.keys(err.errors)[0]].message
          })
        } else {
          res.status(500).json({ message: 'Internal Server Error' })
        }
      })
  }

  static login (req, res) {
    let { email, password } = req.body

    UserModel
      .findOne({ email })
      .select('+password')
      .then(user => {
        if (user && user.comparePassword(password)) {
          let jwtToken = createToken(user)
          res.status(200).json({
            user: {
              _id: user._id,
              email: user.email
            },
            jwtToken
          })
        } else {
          res.status(400).json({ message: 'Bad Credential' })
        }
      })
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }
}

module.exports = Auth
