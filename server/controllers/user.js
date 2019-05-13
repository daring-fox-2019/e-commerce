const { User } = require('../models')
const { hash } = require('../helpers/bcryptjs')
const { compare } = require('../helpers/bcryptjs')
const { sign } = require('../helpers/jwt')

class ControllerUser {
  static create(req, res, next) {
    let { name, email, password } = req.body
    let newUser = {
      name, email, password
    }
    User.create(newUser)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next({
          status: 500,
          message: err.message,
          origin: 'ControllerUser.create'
        })
      })
  }
  static findAll(req, res, next) {
    User.find()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next({
          status: 500,
          mesasge: err.message,
          origin: 'ControllerUser.findAll'
        })
      })
  }
  static findOne(req, res, next) {
    User.findOne({ _id: req.params.userId })
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => {
        next({
          status: 500,
          message: err.message,
          origin: 'ControllerUser.findOne'
        })
      })
  }
  static update(req, res, next) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true })
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => {
        next({
          status: 500,
          message: err.mesasge,
          origin: 'ControllerUser.update'
        })
      })
  }
  static delete(req, res, next) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then(user => {
        const response = {
          message: 'Successfully deleted user.',
          id: req.params.userId
        }
        res.status(200).json(response)
      })
      .catch(err => {
        next({
          status: 500,
          message: err.message,
          origin: 'ControllerUser.delete'
        })
      })
  }

  static login(req, res, next) {
    let { email, password } = req.body
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          next({ status: 401, message: 'Incorrect email/password.', origin: 'login' })
        } else {
          if (!compare(req.body.password, user.password)) {
            next({ status: 401, message: 'Incorrect email/password.', origin: 'login' })
          } else {
            let obj = {
              id: user._id,
            }
            let token = sign(obj)
            res.status(201).json({
              token,
              id: user._id,
              email
            })
          }
        }
      })
      .catch(err => {
        next({ status: 500, message: err.message, origin: 'ControllerUser.login' })
      })
  }
  static cart(req, res, next) {
    User.findOne({ _id: req.user._id })
      .then(user => {
        let isInCart = false
        user.carts.forEach(item => {
          if (item.toString() == req.params.productId.toString()) {
            isInCart = true
          }
        })
        if (!isInCart) {
          return User.findOneAndUpdate({ _id: req.user._id }, { $addToSet: { carts: req.params.productId } }, { new: true })
        } else {
          return User.findOneAndUpdate({ _id: req.user._id }, { $pull: { carts: req.params.productId } }, { new: true })
        }
      })
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => {
        next({ status: 500, message: err.message, origin: 'ControllerUser.cart'})
      })
  }
}

module.exports = ControllerUser