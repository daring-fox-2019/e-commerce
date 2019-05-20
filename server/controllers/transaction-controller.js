const Transaction = require('../models/transaction-model')
const Cart = require('../models/cart-model')
let _ = require('lodash')

class TransactionController {

    static async create(req, res) {
       
        try {
            let { userId, address, total, deliverPrice } = req.body
            let productCart = []
    
            req.body.carts.forEach(cart => {
                productCart.push({
                    productId : cart.ProductId._id,
                    amount : cart.amount
                })
            })
    
            let created = await Transaction.create({
                userId,
                address,
                total,
                deliverPrice,
                status : false,
                carts : productCart
            })

            await Cart.deleteMany({
                UserId : req.authenticatedUser.id
            })
            res.status(200).json({created, msg : 'new Transaction created!'})
        } catch (error) {
            res.status(500).json(error)
        }     
    }

    static async showUser(req, res) {
        try {
            let transactions = await Transaction.find({
                userId : req.authenticatedUser.id
            }).populate('carts.productId')
            res.status(200).json(transactions)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async confirmArrival(req, res) {
      
        try {
         
            await Transaction.findByIdAndUpdate(req.params.id, {
                $set : {status : true}
            })
            res.status(200).json({msg: 'status updated'})
        } catch (error) {
            res.staus(500).json(error)
        }
    }

    static async showAll(req, res) {
        try {
            let transactions = await Transaction.find()
            res.status(200).json(transactions)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async aggregateByMonth(req, res) {
        try {
         
            let aggregate = await Transaction.aggregate([{
                $group : {
                    _id : { $month : '$createdAt'},
                    revenue : { $sum : '$total'}
                }
            }])
           
            res.status(200).json(aggregate)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = TransactionController