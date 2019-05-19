const User = require('../models/user-model')

module.exports = (req, res, next) => {
   
    User
    .findById({_id : req.authenticatedUser.id})
    .then((user)=> {
       
        if( user.role == 'admin'){
            next()
        } else {
            res.status(403).json('You are not authorized!')
        }
    })
    .catch((err)=> {
        res.status(500).json(err)
    })
}
 
