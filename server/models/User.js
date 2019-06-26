const mongoose = require('mongoose')

const { hashPassword, comparePassword } = require('../helpers/user')

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email can\'t be empty'],
    match: [/(.+)@(.+){2,}\.(.+){2,}/, 'Invalid Email'],
    validate: {
      validator: function (val) {
        return User
          .findOne({
            _id: { $ne: this._id },
            email: val
          })
          .then(user => Promise.resolve(!user))
          .catch(err => Promise.reject(err))
      },
      message: 'User with this email is already registered, try another email'
    }
  },
  password: {
    type: String,
    required: [true, 'Password can\'t be empty'],
    select: false
  },
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'item'
  }]
})

userSchema.pre('save', function () {
  if (this.isModified('password')) {
    this.password = hashPassword(this.password)
  }
})

userSchema.methods.comparePassword = function (str) {
  return comparePassword(str, this.password)
}

const User = mongoose.model('user', userSchema)

module.exports = User
