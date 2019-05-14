const {OAuth2Client} = require('google-auth-library')
const User = require('../models/user')
const {comparePassword} = require('../helpers/hash')
const jwt = require('../helpers/jwt')
const axios = require('axios')
const linkedinRequestAuth = `https://www.linkedin.com/oauth/v2/accessToken`

class AuthController {
    static signup(req, res) {
        User.create({...req.body})
            .then(created => {
                res.status(201).json(created)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

    static googleSignIn(req, res) {
        let access_token;
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: req.body.token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const email = payload['email'];
            const firstname = payload['name'].split(' ')[0]
            const lastname = payload['name'].split(' ')[1] ? payload['name'].split(' ')[1] : payload['name']

            User.findOne({email: email})
                .then(found => {
                    if(found) {
                        access_token = jwt.sign({
                            firstname: found.firstname,
                            lastname: found.lastname,
                            email: found.email,
                            role: found.role,
                            _id: found._id
                        })

                        res.status(200).json({access_token: access_token, user: found})
                    }
                    else {
                        return User.create({email: email, password: process.env.DEFAULT_PWD, firstname: firstname, lastname: lastname})
                    }
                })
                .then(function(created) {
                    access_token = jwt.sign({
                        email: created.email,
                        firstname: created.firstname,
                        lastname: created.lastname,
                        role: created.role
                    })

                    res.status(200).json({access_token: access_token, user: created})
                })
                .catch(err => {
                    res.status(500).json(err.message)
                })
        }
        verify().catch(err => {
            cb(err)
        });
    }

    static linkedinSignIn(req, res) {
        console.log('...linkedin arrive...', req.query);
        let signinCode = req.body.code

        axios({
            method: 'GET',
            url: linkedinRequestAuth + `/?grant_type=authorization_code&code=${req.body.token}&redirect_uri=http://localhost:8080&client_id=${process.env.LINKEDIN_CLIENTID}&client_secret=${process.env.LINKEDIN_SECRET}`
        })
        .then(({data}) => {
            console.log('linkedin access token...',data);
            
        })
        .catch(err => {
            console.log('linkedin error ----', err.message);
        })
    }

    static signin(req, res) {
        let email = req.body.email
        let password = req.body.password

        User.findOne({email: email})
            .then(user => {
                if(user) {
                    if(comparePassword(password, user.password)) {
                        let access_token = jwt.sign({
                            email: user.email,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            role: user.role
                        })
                        res.status(200).json({access_token: access_token})
                    }
                    else {
                        res.status(401).json(`Incorrect password`)
                    }
                }
                else {
                    res.status(401).json(`Email not existed`)
                }
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }
}

module.exports = AuthController