const ItemModel = require('../models/Item')

const isSeller = (req, res, next) => {
  ItemModel
    .findById(req.params.item_id)
    .then(item => {
      if (item) {
        if (item.seller.equals(req.user._id)) {
          req.item = item
          next()
        } else {
          res.status(401).json({ message: 'Unauthorized Access' })
        }
      } else {
        res.status(404).json({ message: 'Item Not Found' })
      }
    })
    .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
}

const isNotSeller = (req, res, next) => {
  ItemModel
    .findById(req.params.item_id)
    .then(item => {
      if (item) {
        if (!item.seller.equals(req.user._id)) {
          req.item = item
          next()
        } else {
          res.status(403).json({ message: 'Can\'t add your own item' })
        }
      } else {
        res.status(404).json({ message: 'Item Not Found' })
      }
    })
    .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
}

module.exports = { isSeller, isNotSeller }
