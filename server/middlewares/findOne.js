const Product = require('../models/product');

module.exports = (req, res, next) => {
  const { id } = req.params;
  Product.findById(id)
    .populate({
      path: 'creator',
      select: ['_id', 'name', 'email']
    })
    .then(product => {
      if (!product) {
        const err = {
          status: 404,
          message: 'data not found'
        }
        next(err);
      } else {
        req.product = product;
        next();
      }
    })
    .catch(err => {
      next(err);
    })
}