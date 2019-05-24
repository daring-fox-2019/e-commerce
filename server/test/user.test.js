const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app.js');
const { compare } = require('../helpers/bcrypt')
const { deleteManyUser,
    deleteManyProduct,
    deleteManyTransaction } = require('../helpers/clearDatabase')

chai.use(chaiHttp)

//global variables
const email = 'michael@yahoo.com'
const password = 'haha'
const name = 'michael ryan'
const role = 'admin'

//to be passed to products
let token;
let token_admin;
let product_id, current_stock, current_price;
let cart_id;

describe('User route', function () {
    before(function (done) {
        deleteManyUser(done)
    })

    describe('POST /users/register', function () {
        describe('correct params', function () {
            it('should return created account data (user) with token normal', function (done) {
                const register_obj = { name, password, email }

                chai.request(app)
                    .post('/users/register')
                    .send(register_obj)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('email')
                        expect(res.body).to.have.property('name')
                        expect(res.body.name).to.equal(name)
                        expect(res.body).to.have.property('token')
                        expect(res.body.email).to.equal(email)
                        token = res.body.token
                        done()
                    })
            })

            it('should return created account data (admin) with token', function (done) {
                const register_obj = { name, password, email: 'michael_adm@yahoo.com', role }

                chai.request(app)
                    .post('/users/register')
                    .send(register_obj)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('email')
                        expect(res.body).to.have.property('name')
                        expect(res.body).to.have.property('token')
                        token_admin = res.body.token
                        done()
                    })
            })
        })

        describe('incorrect params', function () {
            it('should return "email is required" and status 500', function (done) {
                const without_email = { password, name }
                chai.request(app)
                    .post('/users/register')
                    .send(without_email)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('message', 'email is required')
                        done()
                    })
            })

            it('should return "password is required" and status 500', function (done) {
                const without_password = { email: 'michael1@yahoo.com', name }

                chai.request(app)
                    .post('/users/register')
                    .send(without_password)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(500)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('message', 'password is required')
                        done()
                    })
            })

            it('should return "name" is required" and status 500', function (done) {
                const without_name = { email: 'michael1@yahoo.com', password }

                chai.request(app)
                    .post('/users/register')
                    .send(without_name)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(500)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('message', 'name is required')
                        done()
                    })
            })
        })

        describe('incorrect input', function () {
            it('should return error with message "Email is registered" and status 500', function (done) {
                const duplicate_email = { name, password, email }

                chai.request(app)
                    .post('/users/register')
                    .send(duplicate_email)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(500)
                        expect(res.body).to.have.property('message', 'Email is registered')
                        done()
                    })
            })

            it('should return error with message "Please use valid email address" and status 500', function (done) {
                const invalid_email = { name, password, email: 'michael.com' }

                chai.request(app)
                    .post('/users/register')
                    .send(invalid_email)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(500)
                        expect(res.body).to.have.property('message', 'Please use valid email address')
                        done()
                    })
            })
        })
    })

    describe('POST /users/login', function () {
        describe('correct params', function () {
            it('should return "token" and status 200', function (done) {
                const login_obj = { email, password }

                chai.request(app)
                    .post('/users/login')
                    .send(login_obj)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('token')
                        expect(res.body.token).to.be.a('string')
                        done()
                    })
            })
        })

        describe('incorrect params', function () {
            it('should return "Invalid email/password" and status 400', function (done) {
                const wrong_password = { email, password: 'yayaya' }

                chai.request(app)
                    .post('/users/login')
                    .send(wrong_password)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.have.property('message', 'Invalid email/password')
                        done()
                    })
            })

            it('should return "Invalid email/password" and status 400', function (done) {
                const wrong_email = { email: 'mi@yahoo.com', password }

                chai.request(app)
                    .post('/users/login')
                    .send(wrong_email)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.have.property('message', 'Invalid email/password')
                        done()
                    })
            })
        })
    })

})


describe('Products route', function () {
    before(function (done) {
        deleteManyProduct(done)
    })

    describe('POST /products', function () {
        describe('correct params', function () {
            it('should return newly created product', function (done) {
                const new_product = {
                    name: 'test product 1',
                    stock: 100,
                    price: 10000,
                    img: 'testurl'
                }

                chai.request(app)
                    .post('/products')
                    .set('token', token_admin)
                    .send(new_product)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res.body).to.have.property('name', 'test product 1')
                        expect(res.body).to.have.property('stock')
                        expect(res.body).to.have.property('price')
                        product_id = res.body._id
                        done()
                    })
            })
        })

        describe('incorrect params', function () {
            it('should return Error - "price must be greater than 0"', function (done) {

                const negative_price = {
                    name: 'negative price 1',
                    stock: 100,
                    price: -10000,
                    img: 'testurl'
                }

                chai.request(app)
                    .post('/products')
                    .set('token', token_admin)
                    .send(negative_price)
                    .end((err, res) => {

                        expect(err).to.be.null
                        expect(res).to.have.status(500)
                        expect(res.body).to.have.property('message', 'price must be greater than 0')
                        done()
                    })
            })

            it('should return Error - "stock must be greater than 0"', function (done) {
                const negative_price = {
                    name: 'negative stock 1',
                    stock: -100,
                    price: 10000,
                    img: 'testurl'
                }

                chai.request(app)
                    .post('/products')
                    .set('token', token_admin)
                    .send(negative_price)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(500)
                        expect(res.body).to.have.property('message', 'stock must be greater than 0')
                        done()
                    })
            })
        })
    })



    describe('GET /products', function () {
        describe('correct params', function () {
            it('should return with array of object of products', function (done) {
                chai.request(app)
                    .get('/products')
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res.body).to.be.an('array')
                        expect(res.body).to.have.property('length')
                        expect(res.body[0]).to.have.property('name')
                        expect(res.body[0]).to.have.property('stock')
                        done()
                    })
            })

            // it('should return an array, in which, match query value', function(done) {

            // })
        })
        // describe('incorrect params', function(){})
    })

    describe('GET /products/:id', function () {
        describe('correct params', function () {
            it('should return with an object of products', function (done) {
                chai.request(app)
                    .get(`/products/${product_id}`)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('name')
                        expect(res.body).to.have.property('stock')
                        expect(res.body).to.have.property('price')

                        //assign
                        current_price = res.body.price
                        current_stock = res.body.stock

                        done()
                    })
            })
        })
    })

    describe('PATCH /products/:id -- admin patch', function () {
        describe('correct params', function () {
            it('should return with updated fields', function (done) {
                const update_name = 'testproduct_updated'
                const update_price = 20000
                const update_image = 'url_image_updated'
                const update_field = {
                    name: update_name,
                    price: update_price,
                    image: update_image
                }

                chai.request(app)
                    .patch('/products/' + product_id)
                    .set('token', token_admin)
                    .send(update_field)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res.body).to.be.an('object')
                        expect(res.body.name).to.equal(update_name)
                        expect(res.body.price).to.equal(update_price)
                        expect(res.body).to.have.property('image', update_image)
                        done()
                    })
            })
        })
        describe('incorrect params', function () {

        })
    })

    describe('PATCH /products/:id/cart --user add cart', function () {
        describe('correct params', function () {
            it('should return with an added stock', function (done) {
                const add_stock = 5

                chai.request(app)
                    .patch('/products/' + product_id + '/cart')
                    .send({ add_stock })
                    .set('token', token_admin)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res.body).to.be.an('object')
                        expect(res.body.stock - add_stock).to.equal(current_stock)
                        current_stock = res.body.stock
                        done()
                    })
            })

            it('should return with an subtracted stock', function (done) {
                const subtract_stock = 5

                chai.request(app)
                    .patch('/products/' + product_id + '/cart')
                    .send({ subtract_stock })
                    .set('token', token_admin)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res.body).to.be.an('object')
                        expect(res.body.stock + subtract_stock).to.equal(current_stock)
                        done()
                    })
            })


        })

        describe('incorrect params', function () {
            it('should return with Error - There is not enough stock', function (done) {
                const subtract_stock = 1000

                chai.request(app)
                    .patch('/products/' + product_id + '/cart')
                    .set('token', token_admin)
                    .send({ subtract_stock })
                    .end((err, res) => {
                        // console.log(res.body, '------------')
                        expect(err).to.be.null
                        expect(res.body).to.have.property('message', 'There is not enough stock')
                        done()
                    })
            })

            it('should return with Error - "order qty must be greater than 0"', function (done) {
                const subtract_stock = 0;
                chai.request(app)
                    .patch('/products/' + product_id + '/cart')
                    .set('token', token_admin)
                    .send({ subtract_stock })
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res.body).to.have.property('message', 'order quantity must be greater than 0')
                        done()
                    })
            })
        })
    })

    describe('DELETE /products/:id', function () {
        describe('correct params', function () {
            // it('should return with deleted product', function(done) {

            //     chai.request(app)
            //     .delete('/products/' + product_id)
            //     .set('token', token_admin)
            //     .end((err, res) => {
            //         expect(res).to.have.status(200)
            //         expect(err).to.be.null
            //         expect(res.body).to.have.property('_id', product_id)
            //         expect(res.body).to.have.property('__v')
            //         done()
            //     })
            // })
        })

        // describe('incorrect params', function() {

        // })
    })


    describe('/PATCH /users ----add item to user\'s cart', function () {
        describe('update user\'s cart', function () {
            describe('Add item to cart', function () {
                it('should return with added item in user', function (done) {
                    // console.log(token, '--------------')
                    chai.request(app)
                        .patch('/users/cart')
                        .send({ add_item_to_cart: product_id, quantity: 10 })
                        .set('token', token)
                        .end((err, res) => {
                            console.log(res.body, '=========== res body')
                            expect(err).to.be.null
                            expect(res).to.have.status(200)
                            expect(res.body.cart).to.be.an('array')
                            expect(res.body.cart.length).not.to.equal(0)
                            cart_id = res.body.cart[0]
                            console.log(cart_id)
                            done()
                        })
                })
            })

            describe('Delete item from cart', function () {
                it('should return user data with removed array', function (done) {
                    // console.log('token', '--------')
                    chai.request(app)
                        .patch('/users/cart')
                        .send({ remove_item_from_cart: cart_id })
                        .set('token', token)
                        .end((err, res) => {
                            expect(err).to.be.null
                            expect(res).to.have.status(200)
                            expect(res.body.cart).to.be.an('array')
                            expect(res.body.cart.length).to.equal(0)
                            done()
                        })
                })
            })
        })
    })
})



let transaction_id = '';
describe('Transaction route', function () {
    // before(function(done) {
    //     deleteManyTransaction(done)
    // })

    transaction_id;
    describe('POST /transactions', function () {
        describe('correct params', function () {
            it('should return with created transaction', function (done) {
                const transaction_obj = {
                    items: [cart_id]
                }
                // console.log(transaction_obj, 'transacction obj <=-----')
                // console.log('token')
                // console.log(token, '---token')

                chai.request(app)
                    .post('/transactions')
                    .set('token', token)
                    .send(transaction_obj)
                    .end((err, res) => {
                        console.log(res.body, '---------')
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res.body).to.have.property('items')
                        expect(res.body.items).not.to.have.lengthOf(0)
                        expect(res.body.items).to.be.an('array')
                        expect(res.body).to.have.property('status')
                        transaction_id = res.body._id
                        // console.log(transaction_id, '----transaction id')
                        done()
                    })
            })
        })

        describe('incorrect params', function () {
            // it('should return with Error - "Not authorized"', function (done) {

            // })
        })
    })

        describe('GET /transactions', function () {
            describe('correct params', function () {
                it('should return with all of user\'s transactions', function (done) {
                    chai.request(app)
                    .get('/transactions')
                    .set('token', token)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('array')
                        done()
                    })

                })
            })

            describe('incorrect params', function () {
                it('should return with Error - "please include valid access token"', function (done) {
                    chai.request(app)
                    .get('/transactions')
                    // .set('token', token)
                    .end((err, res) => {
                        // console.log(res.body, '<-----')
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body).to.have.property('message', 'please include valid access token')
                        done()
                    })
                })

            })
        })

        describe('GET /transactions/:id', function () {
            describe('correct params', function () {
                it('should return with specific transaction', function (done) {
                    // console.log(transaction_id, '-=-=-=-=-=-=')
                    chai.request(app)
                    .get('/transactions/' + transaction_id)
                    .set('token', token)
                    .end((err, res) => {
                        console.log(res.body)
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('items')
                        expect(res.body.items).to.be.an('array')
                        expect(res.body).to.have.property('user')
                        done()
                    })
                })
            })

            // describe('incorrect params', function () {
            //     it('should return with Error - "Not Authorized"', function (done) {
            //         chai.request(app)
            //             .get('/transactions/' + transaction_id)
            //             .set('token', token)
            //             .end((err, res) => {
            //                 expect(err).to.be.null
            //                 expect(res).to.have.status(401)
            //                 expect(res.body).to.have.property('message', 'Not authorized')
            //                 done()
            //             })
            //     })
            // })
        })

        // describe('PATCH /transactions/:id', function () {
        //     describe('incorret params', function () {
        //         // it('should return with Error - "Cart is empty"', function(done) {
        //         //     chai.request(app)
        //         //     .patch('/transactions/' + transaction_id)
        //         //     .send()
        //         // })
        //     })

        //     describe('correct params', function () {
        //         it('should return with detail status:waiting of transactions', function (done) {
        //             chai.request(app)
        //             .patch('/transactions/' + transaction_id)
        //             .send({ change_status_to: 'waiting for payment' })
        //             .set('token', token)
        //             .end((err, res) => {
        //                 expect(err).to.be.null
        //                 expect(res).to.have.status(200)
        //                 expect(res.body).to.have.property('status', 'waiting for payment')
        //                 expect(res.body).to.have.property('total')
        //                 expect(Res.body).to.have.property('secret')
        //                 expect(res.body.total).to.not.equal(0)
        //                 done()
        //             })
        //         })


        //         it('should return with detail status:paid of transaction -- admin', function (done) {
        //             chai.request(app)
        //             .patch('/transactions/' + transaction_id)
        //             .set('token', token_admin)
        //             .send({ paid: true })
        //             .end((err, res) => {
        //                 expect(err).to.be.null
        //                 expect(res.boy).to.be.an('object')
        //                 expect(res.body).to.have.property('status', 'paid')
        //                 done()
        //             })
        //         })
        //     })
        // })

        // describe('DELETE /transactions/:id', function () {

        // })
    // })
})