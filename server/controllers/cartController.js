const Cart = require('../models/cartModel')

class UserController{
    static createCart(req, res, next){
        let { member, items } = req.body
        Cart.create({ member, items })
            .then(newCart=>{
                res.status(201).json(newCart)
            })
            .catch(err=>{
                next(err)
            })
    }
    static getCart(req, res, next){
        Cart.find({})
            .populate('member')
            .populate('items')
            .then(carts=>{
                res.status(200).json(carts)
            })
            .catch(err=>{
                next(err)
            })
    }
    static deleteCart(req, res, next){
        Cart.findByIdAndDelete(req.params.id)
            .then(deleted=>{
                res.status(200).json(deleted)
            })
            .catch(err=>{
                next(err)
            })
    }
    static findMemberCart(req, res, next) {
        Cart.find({
            member: req.params.id
        })
        .populate('member')
        .populate('items')
        .then((carts)=>{
            res.status(200).json(carts)
        })
        .catch((err)=>{
            next(err)
        })
    }
}

module.exports = UserController
