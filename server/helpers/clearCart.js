const Cart = require('../models/cart');

module.exports = function(done) {
  if (process.env.NODE_ENV === 'test') {
    Cart
      .deleteMany({})
      .then(function() {
        done();
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};