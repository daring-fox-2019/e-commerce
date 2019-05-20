function authAdmin(req, res, next) { 
    if (req.payload.role === 'admin') {
        next()
    } else {
        res.status(401).json({
            msg: 'data not match'
        })
    }
}

module.exports = authAdmin