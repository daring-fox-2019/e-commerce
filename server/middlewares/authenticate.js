const User = require('../models/user-model')
const { verify } = require('../helpers/jwt')

module.exports = (req, res, next) => {
    if(req.headers.hasOwnProperty('token')){
        const decoded = verify(req.headers.token)
        console.log(decoded)
        req.authenticatedUser = decoded
        User.findById(decoded.id)
        .then((user) => {
            if(!user){
                res.status(400).json({
                    msg:"Bad Requests"
                })
            }
            else{  
                next()
            }
        })
        .catch((err) => {
            res.status(500).json({
                msg:"Internal Server Error",
                err:err
            })
        })
    }
    else{
        res.json({
            msg:'You must Login first'
        })
    }

    // try {
    //     const decoded = verify(req.headers.token)
    //     req.authenticatedUser = decoded
    //     if (req.body.token) res.status(200).json({ message: 'This user is verified!' })
    //     else next()
    // } catch (error) {
    //     res.status(401).json({ type: 'AUTHENTICATION ERROR', message: 'You do not have access to this page!' })
    // }
}