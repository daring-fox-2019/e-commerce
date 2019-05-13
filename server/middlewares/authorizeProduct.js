const User = require('../models/user')

module.exports = function(req, res, next) {
    let id

    if(req.user.role === 'admin') {
        next()
    }
    else {
        id = req.params.id
        User.findOne({email: req.user.email})
            .then(user => {
                if(user) {
                    if(user._id === id) {
                        next()
                    }
                    else {
                        res.status(403).json(`Forbidden to access the resource`)
                    }
                }
                else {
                    res.status(400).json(`Invalid email`)
                }
            })
            .catch(err => {
                console.log('authorizeProduct error ==> ',err);
                res.status(500).json(`Error during authorization. Please try again.`)
            })
        
    }
}