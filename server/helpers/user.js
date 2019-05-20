const bcrypt = require('bcryptjs')

const hashPassword = str => bcrypt.hashSync(str)
const comparePassword = (str, hash) => bcrypt.compareSync(str, hash)

module.exports = { hashPassword, comparePassword }
