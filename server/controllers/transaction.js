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

    static getAllTransactions(req,res) {
        Transaction.find({user: req.decoded._id})
        .populate({path: 'items', populate: {path: 'product'}})
        .populate('user')
        // .populate({path: 'items', populate: {path: 'product'}})
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
        let update_obj = {}
        if(req.body.status) {
            delete req.body.status
        }
        Transaction.findOneAndUpdate({_id: req.params.id, user: req.decoded._id}, update_obj, {new:true})
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'error di update one transactions'
            })
        })
    }

    static updateConfirmPayment(req,res) {
        let update_obj = {}
        if(req.body.status === 'paid') {
            update_obj.status = 'paid'
        } else if (req.body.status === 'cancel payment') {
            update_obj.status = 'waiting for payment'
        }

        // console.log(update_obj, '---updateobj')
        Transaction.findOneAndUpdate({_id: req.params.id}, update_obj, {new:true})
        .then(updated => {
            console.log(updated)
            res.status(200).json(updated)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'error di payment confirmation -- admin'
            })
        })
    }

    static updateDeliveryStatus(req,res) {
        let update_obj = {}

        if(req.body.status == 'delivered') {
            update_obj.status = 'delivered'
        }

        console.log(update_obj)
        Transaction.findOneAndUpdate({_id: req.params.id, user: req.decoded._id}, update_obj, {new:true})
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'error di update one transactions'
            })
        })
    }

}
module.exports = TransactionController