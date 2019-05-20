const UserModel = require('../models/User')
const ItemModel = require('../models/Item')
const TransactionModel = require('../models/Transaction')

class User {
  static findById (req, res) {
    UserModel
      .findById(req.params.user_id)
      .then(user => {
        if (user) res.status(200).json({ user })
        else res.status(404).json({ message: 'User Not Found' })
      })
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }

  static getCart (req, res) {
    req.user
      .populate({
        path: 'cart',
        populate: {
          path: 'seller'
        }
      })
      .execPopulate()
      .then(user => res.status(200).json({ cart: user.cart }))
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }

  static addItem (req, res) {
    ItemModel
      .findById(req.params.item_id)
      .populate('seller')
      .then(item => {
        if (item) {
          req.user.cart.push(item._id)
          req.user.save()
            .then(user => user.populate({
              path: 'cart',
              populate: {
                path: 'seller'
              }
            }).execPopulate())
            .then(user => res.status(200).json({ cart: user.cart }))
        } else {
          res.status(404).json({ message: 'Item Not Found' })
        }
      })
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }

  static removeItem (req, res) {
    ItemModel
      .findById(req.params.item_id)
      .then(item => {
        if (item) {
          req.user.cart.splice(req.user.cart.indexOf(item._id), 1)
          req.user.save()
            .then(user => user.populate({
              path: 'cart',
              populate: {
                path: 'seller'
              }
            }).execPopulate())
            .then(user => res.status(200).json({ cart: user.cart }))
        } else {
          res.status(404).json({ message: 'Item Not Found' })
        }
      })
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }

  static clearCart (req, res) {
    req.user.cart = []
    req.user.save()
      .then(() => res.status(204).json())
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }

  static checkoutCart (req, res) {
    let items = new Set(req.user.cart.map(itemId => String(itemId)))

    if (!Array.from(items).length) {
      res.status(404).json({ message: 'Can\'t checkout empty cart' })
    } else {
      TransactionModel
        .create({
          owner: req.user._id,
          cart: Array.from(items).map(item => ({
            item,
            count: req.user.cart.filter(itemId => itemId.equals(item)).length
          }))
        })
        .then(transaction => transaction
          .populate('owner')
          .populate({
            path: 'cart.item',
            populate: {
              path: 'seller'
            }
          })
          .execPopulate()
        )
        .then(transaction => res.status(201).json({ transaction }))
        .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
    }
  }
}

module.exports = User
