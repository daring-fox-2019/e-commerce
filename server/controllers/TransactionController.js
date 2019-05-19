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
}


module.exports = TransactionController
