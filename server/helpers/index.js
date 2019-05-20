const { hash } = require('./bcryptjs')
const { compare } = require('./bcryptjs')
const { sign } = require('./jwt')
const { verify } = require('./jwt')
module.exports = {
    hash,sign,verify,compare
}