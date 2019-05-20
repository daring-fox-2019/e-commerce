const jwt = require('../helpers/jwt')
const User = require('../models/user')

module.exports = (req, res, next) => {
    try {
        req.decoded = jwt.verify(req.headers.token)
        User.findOne({ _id: req.decoded._id })
            .then(user => {
                if (user) {
                    next()
                } else {
                    res.status(401).json("Unautheticated")
                }
            })
    } catch (err) {
        res.status(500).json(err)
    }
}