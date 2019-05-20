const Transaction = require('../models/transaction')

module.exports = {
  authtrans : async function (req,res,next) {
    try {
      let found = await Transaction.findById(req.params.id)
      console.log(found, 'KETEMU APA YA??');
      
      if (found.userId.toString() == req.authenticatedUser.id) {
        next()
      } else {
        res.status(401).json({message : "You're not authorized to conduct this action"})
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }
}