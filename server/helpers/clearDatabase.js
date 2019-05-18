const User = require('../models/user');
const Product = require('../models/product');
const Transaction = require('../models/transaction');

module.exports = {
    deleteManyUser(done) {
        if (process.env.NODE_ENV === 'test') {
            User
            .deleteMany({})
            .then(function () {
                done();
            })
            .catch(function (err) {
                console.log(err);
            });
        }
    },
    deleteManyProduct(done) {
        if (process.env.NODE_ENV === 'test') {
            Product
            .deleteMany({})
            .then(function () {
                done();
            })
            .catch(function (err) {
                console.log(err);
            });
        }
    },
    deleteManyTransaction(done) {
        if (process.env.NODE_ENV === 'test') {
            Transaction
            .deleteMany({})
            .then(function () {
                done();
            })
            .catch(function (err) {
                console.log(err);
            });
        }
    }
};