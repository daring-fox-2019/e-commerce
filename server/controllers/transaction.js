const { Transaction } = require('../models')

class ControllerTransaction {
    
    static create (req,res) {
        Transaction.create ({ cart : req.body})
        .then(data =>{
            res.status(201).json ({
                msg : 'checkout successfully'
          }  )
        })
        .catch (err =>{
            res.status(500).json('internal server error')
        })
    }
} 
module.exports = ControllerTransaction