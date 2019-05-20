const { OAuth2Client } = require('google-auth-library')
const { wrapAsync, givesError, jwtGiveToken, jwtVerifyToken, generateStringOfNumber } = require('../helpers')
const User = require('../models/user')
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const functions = {
    register: wrapAsync(async (req, res) => {
        let newUser = { ...req.body }
        if (req.file && req.file.cloudStoragePublicUrl) newUser = { ...newUser, image: req.file.cloudStoragePublicUrl }
        let user = await User.create(newUser)
        if (user) {
            user = user.toObject()
            delete user.password;
            res.status(201).json(user)
        } else throw givesError(404, 'user cannot be created')
    }),

    login: wrapAsync(async (req, res) => {
        console.log(req.body)
        let user = await User.findOne({ email: req.body.email }).select('+password')
        if (user && user.comparePassword(req.body.password)) {
            user = user.toObject()
            delete user.password;
            let token = jwtGiveToken(user)
            // console.log(token)
            res.status(201).json({ user, token })
        }
        else throw givesError(404, 'check your username / password')
    }),
    verify: async (req, res,next) => {
        try {
            // console.log(JSON.stringify(req.headers.token,null,1))
            let token = jwtVerifyToken(req.headers.token)
            let user = await User.findOne({ _id: token._id })
            if (user) {
                user = user.toObject()
                delete user.password;                                
                res.status(201).json({ user, token:req.headers.token })
            }
            else throw givesError(404, 'check your username / password')
        } catch (error) {
            console.log(error)
            next( givesError(404, 'your token is wrong please relogin'))            
        }
    },
    googleLogin: wrapAsync(async (req, res) => {
        let ticket = await googleClient.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.GOOGLE_CLIENT_ID || 'none'
        })
        if (ticket) {
            let { email, name } = ticket.getPayload()
            let user = await User.findOne({ email })
            if (!user) { user = User.create({ password: generateStringOfNumber(8), email, name, image: ticket.picture }) }
            let jwt_token = jwtGiveToken(user)
            let response = {
                user: { _id: user._id, name: user.name, email: user.email, },
                token: jwt_token
            }
            res.status(201).json(response)
        } else throw givesError(404, 'have you supplied the right google credentials')
    })

}


module.exports = functions
