const { verify } = require('../helpers/jwt')
const User = require('../models/user-model')
module.exports = (req, res, next) => {
    try {
        const decoded = verify(req.headers.token)

        User
            .findOne({ _id : decoded._id})
            .then((user) => {
                if (user) {
                    req.authenticatedUser = decoded
                    next()
                } else {
                    res.status(401).json({message: 'You do not have access to this page!' })
                }
            })
    } catch (error) {
        res.status(401).json({message: 'You do not have access to this page!' })
    }
}