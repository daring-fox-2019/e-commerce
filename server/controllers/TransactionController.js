const Transaction = require('../models/transaction')
const Helper = require('../helpers/helper')

class TransactionController {
    static create(req, res) {
        const {userId, carts, totalPayment} = req.body

        Transaction
        .create({
            userId,
            carts,
            totalPayment
        })
        .then(transaction => {
            res.status(201).json(transaction)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({message: err})
        })
    }

    static findAll(req, res) {
        const user = Helper.verifyJWT(req.headers.token)

        Transaction
        .find({
            userId: user.id
        })
        .populate({
            path: 'carts',
            populate: {
                path: 'product'
            }
        })
        .then(transactions=>{
            res.status(200).json(transactions)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static findAllOrders(req, res) {
        Transaction
        .find()
        .populate({
            path: 'carts',
            populate: {
                path: 'product'
            }
        })
        .populate('userId')
        .then(transactions=>{
            res.status(200).json(transactions)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static changeStatusToPaid(req, res) {
        const user = Helper.verifyJWT(req.headers.token)

        Transaction
        .findOneAndUpdate({
            userId: user.id
        }, {
            status: 'paid'
        })
        .then(transactions=>{
            res.status(200).json(stat)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }
}


module.exports = TransactionController
