const mongoose = require('mongoose')
const { generateHash } = require('../helpers/bcrypt')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

let userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'customer'
  },
  email: {
    type: String,
    required: true,
    validate: [{
      validator: function (email) {
        var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
        return emailRegex.test(email)
      },
      message: `Not a valid email address`
    }],
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cart: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Products'
    },
    totalCount: Number,
    totalPrice: Number,
  }],
  subTotal: {
    type: Number,
    default: 0
  },
  totalProduct: {
    type: Number,
    default: 0
  },
})

userSchema.plugin(uniqueValidator)
userSchema.pre('save', function (next) {
  if(this.password.length < 8) next('Password minimal 8 karakter')
  else {
    this.password = generateHash(this.password)
    next()
  }
})

let User = mongoose.model('Users', userSchema)

module.exports = User