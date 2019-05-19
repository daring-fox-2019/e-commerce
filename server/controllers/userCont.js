const User = require('../models/user')
const Product = require('../models/product')
const jwt = require('jsonwebtoken')
const { comparePass } = require('../helpers/bcrypt')
const randomPass = require('../helpers/randomPass')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
  static upsertCart(req, res) {
    Promise.all([User.findOne({ 'cart.product': req.params._id }), Product.findById(req.params._id)])
      .then(results => {
        console.log(results, req.body.count)
        if (results[1].stock - req.body.count >= 0) {
          results[1].stock -= req.body.count
          results[1].save()
        }
        else {
          throw 'melebihi batas stok'
        }
        if (!results[0]) {
          let cart = {
            product: req.params._id,
            totalCount: req.body.count,
            totalPrice: results[1].price * req.body.count
          }
          return User.findOneAndUpdate({
            _id: req.decoded._id
          }, {
              $push: { cart: cart },
              $inc: {
                subTotal: results[1].price * req.body.count,
                totalProduct: req.body.count
              }
            })
        }
        else {
          return User.findOneAndUpdate({
            'cart.product': req.params._id
          }, {
              $inc: {
                'cart.$.totalCount': req.body.count, 'cart.$.totalPrice': results[1].price * req.body.count,
                subTotal: results[1].price * req.body.count,
                totalProduct: req.body.count
              }
            })
        }
      })
      .then((row) => {
        res.status(201).json(row)
      })
      .catch(err => {
        res.status(500).json({
          message: err
        })
      })
  }
  static readCart(req, res) {
    User.findById(req.decoded._id)
      .populate('cart.product')
      .then(row => {
        res.status(200).json(row)
      })
      .catch(err => {
        res.status(500).json({
          message: 'gak bisa bang'
        })
      })
  }

  static deleteCart(req, res) {
    Promise.all([User.findOne({ 'cart.product': req.params._id }), Product.findById(req.params._id)])
      .then(results => {
        results[1].stock += req.body.count
        results[1].save()
        return User.findOneAndUpdate({
          _id: req.decoded._id
        }, {
            $pull: { cart: { product: req.params._id } },
            $inc: {
              subTotal: -results[1].price * req.body.count,
              totalProduct: -req.body.count
            }
          })
      })
      .then((row) => {
        res.status(200).json(row)
      })
      .catch(err => {
        res.status(500).json({
          message: err
        })
      })
    // User.update({
    //   _id: req.decoded._id,
    // }, { $pull: { cart: { product: req.params._id } } })
    //   .then(row => {
    //     res.status(200).json(row)
    //   })
    //   .catch(err => {
    //     res.status(500).json({
    //       message: 'gak bisa bang'
    //     })
    //   })
  }

  static GoogleSignIn(req, res) {
    let payload = null;
    client.verifyIdToken({
      idToken: req.body.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then((ticket) => {
        payload = ticket.getPayload();
        const userid = payload['sub']
        // console.log(payload)
        return User.findOne({ email: payload.email })
      })
      .then((user) => {
        if (user) {
          let { name, role } = user
          let payload = {
            _id: user._id,
            name: user.name,
            role: user.role,
            email: user.email
          }
          let token = jwt.sign(payload, process.env.KUNCI, { expiresIn: "7d" })
          console.log('token --->', token, '<---token')
          res.status(200).json({ token, name, role })
        } else {
          let passRandom = randomPass()
          User.create({
            name: payload.name,
            email: payload.email,
            role: payload.role,
            password: passRandom
          })
            .then((user) => {
              let { name, role } = user
              let payload = {
                _id: user._id,
                name: user.name,
                role: user.role,
                email: user.email
              }
              let token = jwt.sign(payload, process.env.KUNCI)
              console.log('token --->', token, '<---token')
              res.status(201).json({ token, name, role, passRandom })
            })
            .catch((err) => {
              res.status(500).json(err)
            })
        }
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  }

  static register(req, res) {
    User
      .create({
        name: req.body.name,
        role: req.body.role,
        email: req.body.email,
        password: req.body.password
      })
      .then(() => {
        res.status(201).json({
          message: "register success"
        })
      })
      .catch(err => {
        // {
        //   errors: {

        //   }
        // }
        console.log(err)
        if (err.message) {
          res.status(406).json({
            message: `Register failed : ${err.message}`
          })
        }
        else res.status(500).json({
          message: "Internal Server Error"
        })
      })
  }

  static login(req, res) {
    User
      .findOne({
        email: req.body.email
      })
      .then(user => {
        if (user) {
          const isSame = comparePass(req.body.password, user.password)
          if (isSame) {
            let { name, role } = user
            let payload = {
              _id: user._id,
              name: user.name,
              role: user.role,
              email: user.email
            }
            let token = jwt.sign(payload, process.env.KUNCI, { expiresIn: "7d" })
            console.log('token login -->', token)
            res.status(200).json({
              token, name, role
            })
          }
          else {
            res.status(403).json({
              message: 'Email atau password salah'
            })
          }
        }
        else {
          res.status(404).json({
            message: "Email not found, please register first"
          })
        }
      })
      .catch(err => {
        if (err.message) {
          res.status(406).json({
            message: `Login failed : ${err.message}`
          })
        }
        else res.status(500).json({
          message: "Internal Server Error"
        })
      })
  }
}

module.exports = UserController