const dotenv = require('dotenv')
const Product = require('../model/product')
const Cart = require('../model/cart')
const User = require('../model/user')
const jwt2 = require('../helpers/jwt')
dotenv.config()

module.exports ={
    Authenticate: (req,res,next) => {
        let jwtoken = req.headers.jwtoken
        try {
            let decoded = jwt2.verifyToken(jwtoken)
            if(decoded){
                User.findOne({_id: decoded.id})
                .then(data => {
                    if(data){
                        req.body.userId = decoded.id
                        next()
                    } else {
                        next(new Error("Not authenticated"))
                    }
                })
            }
        } catch (err) {
            next(err)
        }
    },
    Authorize: {
        updateProduct: (req,res,next) => {
            console.log('aa')
            let userId = req.body.userId
            let id = req.params.id
            Product.findOne({_id: id})
            .then(product => {
                if(product!==null && product.owner == userId){
                    next()
                } else {
                    next(new Error('Not authorized'))
                    // res.status(401).json("You're not authorized")
                }
            })
            .catch(err => {
                next(err)
            })
        },
        deleteProduct: (req,res,next) => {
            let userId = req.body.userId
            let id = req.params.id
            Product.findOne({_id: id})
            .then(product => {
                console.log(product, userId,'kokopop')
                if(product!=null && product.owner == userId){
                    next()
                } else {
                    next(new Error("Not authorized"))
                }
            })
            .catch(err => {
                next(err)
            })
        },
        deleteCart: (req,res,next) => {
            let userId = req.body.userId
            let id = req.params.id
            Cart.findOne({_id: id})
            .then(cart => {
                console.log(cart,'iopiop')
                if(cart!=null && cart.owner == userId){
                    next()
                } else {
                    next(new Error("Not authorized"))
                }
            })
            .catch(err => {
                next(err)
            })
        },
        updateCart: (req,res,next) => {
            let userId = req.body.userId
            let id = req.params.id
            
            Cart.findOne({_id: id})
            .then(cart => {
                if(cart!=null && cart.owner == userId){
                    next()
                } else {
                    next(new Error("Not authorized"))
                }
            })
            .catch(err => {
                next(err)
            })
        },
        admin: function(req,res,next){
            User.findOne({_id:req.body.userId})
            .then(userFound => {
                if(userFound.role === 'admin'){
                    next()
                } else {
                    next(new Error('Not authorized'))
                }
            })
            .catch(err => {
                next(err)
            })
        }
    }
}