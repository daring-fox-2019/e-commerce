const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, `Username required.`],
  },
  email: {
    type: String,
    required: [true, `Email required.`],
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  }
})

let User = mongoose.model('User', userSchema)


User.schema.path('email').validate(function (input) {
  return User.findOne({email: input})
    .then(found => {
      if(found) {
        return false
      } else {
        return true
      }
    })
    .catch(err => {console.log(err)})
}, 'Email already used.')

module.exports = User