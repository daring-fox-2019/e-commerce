const Transaction = require('../models/transaction')
class TransactionController {
    static create(req,res) {
        // console.log(req.body)
        const { items } = req.body
        const role = req.body.role || 'user'
        // console.log(items)
        // console.log('masuk create')
        Transaction.create({items, user: req.decoded._id, role})
        .then(created => {
            res.status(201).json(created)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'error creating new transaction'
            })
        })
    }

    static findOne(req,res) {
        Transaction.findOne({_id: req.params.id})
        .then(found => {
            res.status(200).json(found)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'error when find one transaction'
            })
        })
    }

    static findAll(req,res) {
        Transaction.find({user: req.decoded._id})
        .then(found => {
            res.status(200).json(found)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'error when find all user\'s transaction'
            })
        })
    }

    static updateOne(req,res) {

    }

    static deleteOne(req,res) {

    }

}
module.exports = TransactionController