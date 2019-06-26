const ItemModel = require('../models/Item')

class Item {
  static findAll (req, res) {
    ItemModel
      .find()
      .populate('seller')
      .then(items => res.status(200).json({ items }))
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }

  static findById (req, res) {
    ItemModel
      .findById(req.params.item_id)
      .populate('seller')
      .then(item => {
        if (item) res.status(200).json({ item })
        else res.status(404).json({ message: 'Item Not Found' })
      })
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }

  static create (req, res) {
    let { name, stock, price } = req.body

    ItemModel
      .create({
        name,
        stock,
        price,
        imageUrl: process.env.NODE_ENV === 'test'
          ? req.file.originalname
          : req.file.path,
        seller: req.user._id
      })
      .then(item => {
        return item
          .populate('seller')
          .execPopulate()
      })
      .then(item => res.status(201).json({ item }))
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

  static update (req, res) {
    let imageUrl

    if (req.file) {
      if (process.env.NODE_ENV === 'test') {
        imageUrl = req.file.originalname
      } else {
        imageUrl = req.file.path
      }
    }

    req.item
      .updateOne({
        $set: {
          name: req.body.name,
          imageUrl: imageUrl,
          stock: req.body.stock,
          price: req.body.price
        }
      }, { omitUndefined: true, runValidators: true })
      .then(() => ItemModel.findById(req.item._id).populate('seller'))
      .then(item => res.status(200).json({ item }))
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

  static delete (req, res) {
    req.item
      .remove()
      .then(item => {
        return res.status(200).json({
          item: {
            _id: item._id
          }
        })
      })
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }
}

module.exports = Item
