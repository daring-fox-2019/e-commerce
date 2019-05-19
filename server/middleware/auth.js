const User = require('../models/user')
const Cart = require('../models/cart')
const Transaction = require('../models/transaction')
const { verify } = require('../helpers/jwt')

function authentication(req, res, next){
    let decoded = verify(req.headers.token);
    User.findOne({email : decoded.email})
    .then(userFound=>{
        if(userFound){
            req.userId = userFound._id 
            next()
        }else{
            res.status(401).json({message: 'Unauthorized1'})
        }       
    })
    .catch(err=>{
        res.status(500).json({message: 'Unauthorized'})
    })
    process.env.VUE_APP_asdad
}

function authorizationCart(req, res, next){
    Cart.findById(req.params.id)
    .then(data=>{
        if(String(data.userId)===String(req.userId)){
            next()
        }else{
            res.status(401).json({message: 'Unauthorized'})
        }
    })
    .catch(err=>{
        res.status(500).json({message: 'Unauthorized'})
    })
}

function authorizationTransaction(req, res, next){
    Transaction.findById(req.params.id)
    .then(data=>{
        if(String(data.userId)===String(req.userId)){
            next()
        }else{
            res.status(401).json({message: 'Unauthorized'})
        }
    })
    .catch(err=>{
        res.status(500).json({message: 'Unauthorized'})
    })
}

module.exports={authentication, authorizationCart, authorizationTransaction}
