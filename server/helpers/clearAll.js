const Product = require('../model/product')
const User = require('../model/user')
const Cart = require('../model/cart')
let argv = process.argv[2]

module.exports = function (done) {
    if (argv === '--exit') {
        Product.deleteMany({})
            .then(function () {
                return User.deleteMany({})
                    .then(function () {
                        return Cart.deleteMany({})
                            .then(function () {
                                done()
                            })
                    })

            })
            .catch(function (err) {
                console.log(err)
            })
    }
}