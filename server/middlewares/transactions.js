const UserModel = require('../models/User')

const isNotSeller = (req, res, next) => {
  // UserModel
  //   .find()
  //   .select('+transactions')
  //   .then(users => {
  //     console.log(users.map(u => u.transactions.map(t => t._id)))
  //   })
  req.user
    .getTransactions()
    .then(user => {
      // console.log(user.transactions.map(t => t.id), req.params.transaction_id)
      let transaction = user.transactions
        .find(t => {
          return t._id.equals(req.params.transaction_id)
        })

      if (transaction) {
        let isSeller = transaction.cart.some(
          i => i.seller._id.equals(req.user._id)
        )
        if (isSeller) {
          res.status(401).json({ message: 'Unauthorized Access' })
        } else {
          next()
        }
      } else {
        res.status(404).json({ message: 'Transaction Not Found' })
      }
    })
}

module.exports = { isNotSeller }
