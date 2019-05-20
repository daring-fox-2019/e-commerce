const Helper = require('../helpers/helper')

module.exports = (req, res, next) => {
    try {
        const decoded = Helper.verifyJWT(req.headers.token);
        req.decoded = decoded
        req.headers.token = decoded.token
        req.headers.id = decoded.id
        req.headers.name = decoded.name
        req.header.role = decoded.role

        if(decoded.role === 'Admin') {
            next()
        }else{
            return 'Auth failed'
        }
    } catch (err) {
        res.status(500).json(err)
    }
}