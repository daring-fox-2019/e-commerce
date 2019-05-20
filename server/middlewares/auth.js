const { verify } = require('../helpers/jwt')
const { compare } = require('../helpers/bcrypt')
const User = require('../models/user')
const Product = require('../models/product')
const Transaction = require('../models/transaction')

module.exports = {
    authenticate(req, res, next) {
        // console.log(req.headers.token, '--------token')
        if(req.headers.token) {
            const decoded = verify(req.headers.token)
            req.decoded = decoded
            next()
        } else {
            res.status(401).json({
                message: 'please include valid access token'
            })
        }
    },
    authorizeProduct(req, res, next) {
        Product.findOne({_id: req.params.id, user: req.decoded._id})
        .then(found => {
            if(found) next()
            // else if(compare('admin', found.role)) next()
            else {
                res.status(401).json('Not authorized')
            }
        })
        .catch(err => {
            res.status(500).json({
                error: 'error product authorization',
                message: err.message
            })
        })
    },
    authorizeTransaction(req,res,next) {
        Transaction.findOne({_id: req.params.id})
        .then(found => {
            if(found && found.user == req.decoded._id) next()
            else if(compare('admin', found.role)) next()
            else {
                res.status(401).json({message: 'Not authorized'})
            }
        })
        .catch(err => {
            res.status(401).json({
                message: err.message,
                error: 'error user transaction authorization'
            })
        })
    },
    adminAuthorization(req,res,next) {
        // console.log('masuk authorization')
        // console.log(req.headers.token)
        // console.log(req.decoded)
        User.findOne({email: req.decoded.email})
        .then(found => {
            // console.log(found)
            // console.log(compare('admin', found.role))
            if(found) {
                // console.log(found, 'found <--')
                if(compare('admin', found.role)) next()
                else {
                    res.status(401).json({message: 'Not authorized'})
                }
            } else {
                res.status(401).json({message: 'Not authorized'})
            }
        })
        .catch(err => {
            res.status(500).json({
                error: 'error admin authorization',
                message: err.message
            })
        })
    }
}