const Product = require('../models/productModel');

module.exports = function(done) {
  if (process.env.NODE_ENV === 'test') {
    return Product
      .deleteMany({})
      .then(function() {
        done();
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};