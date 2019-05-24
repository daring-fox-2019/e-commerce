const User = require('../models/user');
const Cart = require('../models/cart');
const Product = require('../models/product');
const Transaction = require('../models/transaction');

module.exports =  {
  user(done){
    if (process.env.NODE_ENV === 'test') {
      User
        .deleteMany({})
        .then(function() {
          done();
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  cart(done) {
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
  },
  product(done) {
    if (process.env.NODE_ENV === 'test') {    
      Product
        .deleteMany({})
        .then(function() {
          done();
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  transaction(done) {
    if (process.env.NODE_ENV === 'test') {
      Transaction
      .deleteMany({})
      .then(function() {
        done();
      })
      .catch(function(err) {
        console.log(err);
      });
    }
  }
}
