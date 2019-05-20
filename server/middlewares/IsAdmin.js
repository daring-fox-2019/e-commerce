const User = require('../models/user')

module.exports = (req, res, next) => {
    User.findOne({_id: req.decoded._id})
    .then(user =>{
        if(user.role === 'admin'){
            next()
        } else {
            res.status(403).json({err: "Forbidden"})
        }
    })
    .catch(err =>{
        res.status(500).json(err)
    })
}