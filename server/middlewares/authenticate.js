const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = {
    authenticate : function(req, res, next)  {
        try {
            let decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
            User.findOne({_id : decoded.id})
            .then(user => {
                if (user) {                    
                    req.authenticatedUser = decoded

                    next()
                }
                else {
                    res.status(401).json({message : 'Unauthenticated user'})
                }
            })  
        } catch (error) {
            res.status(401).json({message : 'Unauthenticated user'})
        }
    }
}
