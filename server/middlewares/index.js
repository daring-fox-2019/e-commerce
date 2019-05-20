// const { OAuth2Client } = require('google-auth-library')
// const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const { wrapAsync, givesError, jwtVerifyToken, generateStringOfNumber } = require('../helpers')
const User = require('../models/user')
const Product = require('../models/product')

async function authorize(req, res, next) {
    try {
        let token = jwtVerifyToken(req.headers.token)
        let user = await User.findOne({ _id: token._id })
        if (user) {
            req.user = user
            next()
        }
        else {
            next(givesError(401, 'bad token, please properly login to our system'))
        }
    } catch (error) {
        next(error)
    }
}
//only call this after above authorization
async function authorizeOnProductParam(req, res, next) {
    try {
        let product = await Product.findOne({_id:req.params.id})
        if (req.user && product && req.user._id.equals(product.owner)) {            
            req.product = product
            next()
        }
        else {
            next(givesError(401, 'you are not the owner of this product'))
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { authorize,authorizeOnProductParam }