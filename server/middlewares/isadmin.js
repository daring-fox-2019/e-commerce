const User = require('../models/user')

module.exports = {
    isadmin : async function (req,res,next) {
        try {
            let found = await User.findById(req.authenticatedUser.id)
            if (found.role == 'admin') {
                next()
            }
            else res.status(401).json({msg : 'Not authorized to conduct actions'})
        
        } catch (error) {            
            res.status(500).json(error)
        }
    }
}