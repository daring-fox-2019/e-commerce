const User       = require('../models/user');
const Transaction    = require('../models/transaction');
const Product    = require('../models/product');
const { decode } = require('../helpers');

module.exports = {
    authentication: function (req, res, next) {
        try {
            const token = req.headers.accesstoken
            if (token) {
                const decoded = decode(req.headers.accesstoken)
                req.authenticatedUser = decoded

                if (process.env.NODE_ENV === 'test') {
                    next();
                } else {
                    User
                        .findById(req.authenticatedUser._id)
                        .then(user => {
                            if (user) {
                                
                                next();
                            } else {
                                res
                                    .status(401)
                                    .json({
                                        message: 'Token is not valid'
                                    })
                            }
                        })
                        .catch(err => {
                            next(err);
                        })
                }
            } else {
                res
                    .status(401)
                    .json({
                        message: 'Please login to continue'
                    })
            }
        } catch (err) {
            res
                .status(401)
                .json({
                    message: 'Please login to continue'
                })
        }
    },

    transactionAuthorization: function (req, res, next) {
        Transaction
            .findById(req.params.id)
            .then(transaction => {
                if (transaction) {
                    if (String(transaction.buyer) !== req.authenticatedUser._id && req.authenticatedUser.role !== 'Admin') {
                        res
                            .status(403)
                            .json({
                                message: 'Forbidden'
                            })
                    } else {
                        next()
                    }
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'Transaction not found'
                        })
                }
            })
            .catch(err => {
                next(err);
            })
    },

    productAuthorization: function (req, res, next) {
        if (req.authenticatedUser.role == 'Admin') {
            next()
        } else {
            res
                .status(403)
                .json({
                    message: 'Forbidden'
                })
        }
    },
}
