const { verify } = require('../helpers')
const { User } = require('../models')
const { Product } = require('../models')

module.exports = {
    authenticate : function(req,res,next) {
        let token = req.headers.token
        if (!token) {
            res.status(400).json({
                message : 'Please login to access this endpoint'
            })
        }else {
            let decode = verify(token)
            User.findOne({ email : decode.email })
            .then(user =>{
                if(user){
                    req.user = user
                    next()
                }else {
                    res.status(400).json({ message: 'user invalid' })
                }
            })
            .catch(err =>{
                res.status(500).json({ message: 'Internal server error' })
            })
        }
    }
}