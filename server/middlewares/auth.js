const { verify } = require('../helpers/jwt');
const { User, Cart, Transaction } = require('../models');

module.exports = {
  authenticate: function (req, res, next) {
    // console.log({ params: req.params, dari: 'authenticate' })
    let token = req.headers.token;
    if (!token) {
      next({ status: 401, message: 'You must login first to access this endpoint.', origin: 'Helpers authenticate' })
    } else {
      let decoded = verify(token, res);
      User
        .findOne({
          email: decoded.email
        })
        .then(user => {
          if (user) {
            req.user = user;
            next();
          } else {
            next({ status: 401, message: 'User invalid.', origin: 'Helpers authenticate'})
          }
        })
        .catch(err => {
          next({ status: 500, message: err.message, origin: 'Helpers authenticate'})
        })
    }
  },
  authorize: function (req, res, next) {
    Cart.findOne({ _id: req.params.cartId})
      .then(cart => {
        if(cart) {
          if(cart.user.toString() == req.user._id.toString()) {
            next()
          } else {
            next({ status: 401, message: 'Can only write your cart', origin: 'Helpers authorize'})
          }
        } else {
          next({ status: 401, message: 'Invalid cartId', origin: 'Helpers authorize'})
        }
      })
      .catch(err => {
        next({ status: 500, message: err.message, origin: 'Helpers authorize'})
      })
  },
  authorizeTransaction: function (req, res, next) {
    Transaction.findOne({ user: req.user._id })
      .then(transaction => {
        if(transaction) {
          if(transaction.user.toString() == req.user._id.toString()) {
            next()
          } else {
            next({ status: 401, message: 'Can only write your transaction', origin: 'Helpers authorize'})
          }
        } else {
          next({ status: 401, message: 'Invalid transactionId', origin: 'Helpers authorize'})
        }
      })
      .catch(err => {
        next({ status: 500, message: err.message, origin: 'Helpers authorize'})
      })

  }
}
