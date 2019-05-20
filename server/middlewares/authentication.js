const jwt = require('jsonwebtoken')

module.exports = function(req,res,next){
    // console.log('ini req headers',req.headers);
    
    if(req.headers.hasOwnProperty('token')){
        let decoded = jwt.verify(req.headers.token,`${process.env.SECRET_KEY}`)
        req.loggedUser = decoded
        next()
    }else{
        res.status(401).json({
            msg:'you need to login first'
        })
    }
}