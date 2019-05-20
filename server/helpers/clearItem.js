const { Item } = require('../models');

module.exports = function(done) {
  if (process.env.NODE_ENV === 'test') {
   return  Item
      .deleteMany({})
      .then(function() {
        done();
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};