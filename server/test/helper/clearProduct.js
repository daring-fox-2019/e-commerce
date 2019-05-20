
const ProductModel = require('../../models/product')

module.exports = function(done) {
  if (process.env.NODE_ENV === 'test') {
    ProductModel
      .deleteMany({})
      .then(function() {
        done();
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
