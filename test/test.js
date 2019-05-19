const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../server/app')
const User = require('../server/model/user')
const clearAllData = require('../server/helpers/clearAll')
let jwt
let userId
let productId
let cartId

chai.use(chaiHttp)


// after(function (done) {
//     clearAllData(done)
// })
function emailForm(value) {
    let regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    return regex.test(value)
}

function checkUnique(value) {
    return User.find({
            email: value
        })
        .then(result => {
            if (result.length > 1) {
                return false
            } else {
                console.log('hehehe')
                return true
            }
        })
        .catch(err => {
            console.log(err)
        })
}

before(function (done) {
    clearAllData(done)
})
describe.only('Users tests', function () {
    describe('POST /users/register', function () {
        it('POST-USER-REGISTER-SUCCESS: should send an object of newly added user with 201 status code', function (done) {
            const newUser = {
                "name": "name",
                "email": "ab@c.com",
                "password": 'password',
                "address": 'Jakarta',
                "phoneNumber": '08577181818',
                "pp": 'pp'
            }
            chai.request(app)
                .post('/users/register')
                .send(newUser)
                .end(function (err, res) {
                    userId = res.body._id
                    expect(err).to.be.null
                    console.log(res.body)
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.keys(['name', 'email', 'password', 'address', 'phoneNumber', 'pp', '_id', '__v', 'role'])
                    expect(res.body.name, res.body.email, res.body.password, res.body.address, res.body.phoneNumber, res.body.pp, res.body._id, res.body.__v, res.body.role).to.be.a('string')
                    checkUnique(res.body.email)
                        .then(result => {
                            console.log(result, 'opop')
                            expect(result).to.equal(true)
                        })
                    expect(emailForm(res.body.email)).to.equal(true)
                    expect(res).to.be.an('object')
                    done()
                })
        })
    })
    describe('POST /users/register', function () {
        it('POST-USER-REGISTER-ERROR-400: should send an object of error report with 400 status code', function (done) {
            const newUser = {
                "name": "name",
                "email": "NOT AN EMAIL TYPE OF STRING",
                "password": null,
                "address": 'Jakarta',
                "phoneNumber": '08577181818',
                "pp": 'pp'
            }
            chai.request(app)
                .post('/users/register')
                .send(newUser)
                .end(function (err, res) {
                    console.log(res.body)
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.err.message).to.equal('Invalid register input')
                    expect(res.body.err).to.have.keys('name', 'source', 'message')
                    expect(res).to.be.an('object')
                    done()
                })
        })
    })
    describe('POST /users/login', function () {
        it('POST-USER-LOGIN-SUCCESS: should send object of user token and user id with 200 status code', function (done) {
            const loginUser = {
                "email": "ab@c.com",
                "password": 'password',
            }
            chai.request(app)
                .post('/users/login')
                .send(loginUser)
                .end(function (err, res) {
                    jwt = res.body.jwtoken
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.keys(['jwtoken', 'id', 'name', 'pp','role'])
                    expect(res).to.be.an('object')
                    expect(res.body.jwtoken, res.body.id, res.body.name, res.body.pp).to.be.a('string')
                    done()
                })
        })
    })
    describe('POST /users/login', function () {
        it('POST-USER-LOGIN-ERROR-400: should send object of error report with 400 status code', function (done) {
            const loginUser = {
                "email": "wrong@email.com",
                "password": 'wrongpassword',
            }
            chai.request(app)
                .post('/users/login')
                .send(loginUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body.err.message).to.equal('Invalid login input')
                    expect(res.body.err).to.have.keys('name', 'source', 'message')
                    done()
                })
        })
    })
    describe('PUT /users/update/5cba44589ba3ae7f7fee94b7', function () {
        it('PUT-USER-UPDATE-SUCCESS: should send an object of user update report with 201 status code', function (done) {
            const updateUser = {
                "name": "name",
                "email": "ab@c.com",
                "password": 'password',
                "address": 'Jakarta',
                "phoneNumber": '08577181818',
                "pp": 'pp'
            }
            chai.request(app)
                .put('/users/update/' + userId)
                .send(updateUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    console.log(res.body)
                    expect(res.body).to.have.keys('n', 'nModified', 'ok')
                    expect(res.body.n, res.body.nModified, res.body.ok).to.equal(1)
                    expect(res).to.have.status(201)
                    expect(res).to.be.an('object')
                    done()
                })
        })
    })
    describe('PUT /users/update/someinvalidid', function () {
        it('PUT-USER-UPDATE-ERROR-400: should send an object of error report with 400 status code', function (done) {
            const updateUser = {
                "name": "name",
                "email": "ab@c.com",
                "password": 'password',
                "address": 'Jakarta',
                "phoneNumber": '08577181818',
                "pp": 'pp'
            }
            chai.request(app)
                .put('/users/update/someinvalidid')
                .send(updateUser)
                .end(function (err, res) {
                    console.log(res.body)
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body.err).to.have.keys('name', 'source', 'message')
                    expect(res.body.err.name).to.equal('CastError')
                    expect(res.body.err.source).to.equal('mongoose client')
                    done()
                })
        })
    })
})

describe.only('Products tests', function () {
    describe('POST /products', function () {
        it('POST-PROD-SUCCESS: should send an object of newly added product with 201 status code', function (done) {
            const newProduct = {
                'item': 'item',
                'price': 5000,
                'stock': 50,
                'img': 'img',
                'description': 'description',
                'owner': userId
            }
            chai.request(app)
                .post('/products')
                .send(newProduct)
                .set('jwtoken', jwt)
                .end(function (err, res) {
                    productId = res.body._id
                    expect(err).to.be.null
                    expect(res.body).to.have.keys(['item', 'price', 'stock', 'img', 'description', 'owner', '__v', '_id', 'cart'])
                    expect(res.body.stock, res.body.proce).to.be.a('number')
                    expect(res.body.item, res.body.img, res.body.description, res.body.owner, res.body._id).to.be.a('string')
                    expect(res).to.have.status(201)
                    expect(res).to.be.an('object')
                    done()
                })
        })
    })
    describe('POST /products', function () {
        it('POST-PROD-ERR-401: should send an object of error with 401 status code', function (done) {
            const newProduct = {
                'item': 'item',
                'price': 5000,
                'stock': 50,
                'img': 'img',
                'description': 'description',
                'owner': userId
            }
            chai.request(app)
                .post('/products')
                .send(newProduct)
                .end(function (err, res) {
                    expect(res).to.be.an('object')
                    expect(res).to.have.status(401)
                    expect(res.body.err).to.have.keys(['name', 'source', 'message'])
                    expect(res.body.err.message).to.equal('jwt must be provided')
                    done()
                })
        })
    })
    describe('POST /products', function () {
        it('POST-PROD-ERR-400: should send an object of error with 400 status code', function (done) {
            const newProduct = {
                'item': undefined,
                'price': undefined,
                'stock': undefined,
                'img': undefined,
                'description': undefined,
                'owner': undefined
            }
            chai.request(app)
                .post('/products')
                .set('jwtoken', jwt)
                .send(newProduct)
                .end(function (err, res) {
                    let regex = new RegExp('Product validation failed:')
                    expect(res).to.be.an('object')
                    expect(res.body.err).to.have.keys(['name', 'source', 'message'])
                    expect(regex.test(res.body.err.message)).to.equal(true)
                    expect(res).to.have.status(400)
                    done()
                })
        })
    })
    describe('GET /products', function () {
        it('GET-PRODUCTS-SUCCESS: should send an object of list products with 200 status code', function (done) {
            chai.request(app)
                .get('/products')
                .send({
                    'owner': userId
                })
                .set('jwtoken', jwt)
                .end(function (err, res) {
                    expect(res.body).to.be.an('array')
                    expect(res).to.be.an('object')
                    expect(res).to.have.status(200)
                    done()
                })
        })
    })
    describe('GET /products', function () {
        it('GET-PRODUCTS-ERR-401: should send an object of error with 401 status code', function (done) {
            chai.request(app)
                .get('/products')
                .send({
                    'owner': userId
                })
                .end(function (err, res) {
                    expect(res).to.be.an('object')
                    expect(res.body.err).to.have.keys('name', 'message', 'source')
                    expect(res.body.err.message).to.equal('jwt must be provided')
                    expect(res).to.have.status(401)
                    done()
                })
        })
    })
    describe('PUT /products/:productId', function () {
        it('PUT-PROD-SUCCESS: should send an object of product update report with 201 status code', function (done) {
            const updateProduct = {
                'item': 'item',
                'price': 5000,
                'stock': 50,
                'img': 'img',
                'description': 'description',
            }
            chai.request(app)
                .put('/products/' + productId)
                .send(updateProduct)
                .set('jwtoken', jwt)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res.body).to.have.keys('n', 'nModified', 'ok')
                    expect(res.body.n, res.body.nModified, res.body.ok).to.equal(1)
                    expect(res).to.have.status(201)
                    expect(res).to.be.an('object')
                    done()
                })
        })
    })
    describe('PUT /products/5cb9f0daf079902d271a2689', function () {
        it('PUT-PROD-ERR-401: should send an object of error report with 401 status code', function (done) {
            const updateProduct = {
                'item': 'item',
                'price': 5000,
                'stock': 50,
                'img': 'img',
                'description': 'description',
            }
            chai.request(app)
                .put('/products/' + productId)
                .send(updateProduct)
                .end(function (err, res) {
                    expect(res.body.err).to.have.keys(['source', 'message', 'name'])
                    expect(res.body.err.message).to.equal('jwt must be provided')
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res).to.be.an('object')
                    done()
                })
        })
    })
    describe('PUT /products/asdasdadad', function () {
        it('PUT-PROD-ERR-400: should send an object of error report with 400 status code', function (done) {
            const updateProduct = {
                'item': undefined,
                'price': undefined,
                'stock': undefined,
                'img': undefined,
                'description': undefined,
                'owner': undefined,
                'userId': undefined,
            }
            chai.request(app)
                .put('/products/asdasdasd')
                .send(updateProduct)
                .set('jwtoken', jwt)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res.body.err).to.have.keys(['name', 'source', 'message'])
                    expect(res.body.err.name).to.equal('CastError')
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    done()
                })
        })
    })
    describe('DELETE /products/:id', function () {
        it('DELETE-PROD-ERROR-401: should send an object of error report with 401 status code', function (done) {
            chai.request(app)
                .delete('/products/' + productId)
                .send({
                    'userId': '5cb4a73c3ebeb62aa57affde'
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res.body.err).to.have.keys(['name', 'source', 'message'])
                    expect(res.body.err.message).to.equal('jwt must be provided')
                    expect(res).to.have.status(401)
                    expect(res).to.be.an('object')
                    done()
                })
        })
        describe('DELETE /products/:productId', function () {
            it('DELETE-PROD-SUCCESS: should send an object of product delete report with 200 status code', function (done) {
                chai.request(app)
                    .delete('/products/' + productId)
                    .set('jwtoken', jwt)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.have.keys(['n', 'ok', 'deletedCount'])
                        expect(res.body.n, res.body.ok, res.body.deletedCount).to.equal(1)
                        expect(res).to.be.an('object')
                        done()
                    })
            })
        })
    })
    describe('DELETE /products/afiasfjaf684fw64aww6f', function () {
        it('DELETE-PROD-ERROR-400: should send an object of product delete report with 400 status code', function (done) {
            chai.request(app)
                .delete('/products/afiasfjaf684fw64aww6f')
                .set('jwtoken', jwt)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res.body.err).to.have.keys(['name', 'source', 'message'])
                    expect(res.body.err.name).to.equal('CastError')
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    done()
                })
        })
    })
})



describe.only('Carts tests', function () {
    describe('POST /carts/add', function () {
        it('POST-CARTS-ADD-SUCCESS: should send an object of newly added cart with 201 status code', function (done) {
            const newCart = {
                "name": "name",
                "owner": userId
            }
            chai.request(app)
                .post('/carts/add')
                .set('jwtoken', jwt)
                .send(newCart)
                .end(function (err, res) {
                    cartId = res.body._id
                    expect(err).to.be.null
                    expect(res.body).to.have.keys(['name', 'products', 'checkout', 'delivered', '_id', 'owner', '__v'])
                    expect(res.body.name, res.body._id, res.body.owner, res.body.__v).to.be.a('string')
                    expect(res.body.products).to.be.an('array')
                    expect(res.body.checkout, res.body.delivered).to.be.a('boolean')
                    expect(res.body.checkout)
                    expect(res).to.have.status(201)
                    expect(res).to.be.an('object')
                    done()
                })
        })
    })
    describe('POST /carts/add', function () {
        it('POST-CARTS-ADD-ERROR-401: should send an object of error report with 401 status code', function (done) {
            const newCart = {
                "name": "name",
                "owner": userId
            }
            chai.request(app)
                .post('/carts/add')
                .send(newCart)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res).to.be.an('object')
                    expect(res.body.err).to.have.keys(['name', 'source', 'message'])
                    expect(res.body.err.message).to.equal('jwt must be provided')
                    done()
                })
        })
    })
    describe('POST /carts/add', function () {
        it('POST-CARTS-ADD-ERROR-400: should send an object of error report with 400 status code', function (done) {
            const newCart = {
                "name": "name",
                "owner": 'INVALID OWNER'
            }
            chai.request(app)
                .post('/carts/add')
                .set('jwtoken', jwt)
                .send(newCart)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body.err).to.have.keys('message', 'source', 'name')
                    expect(res.body.err.name).to.equal('ValidationError')
                    done()
                })
        })
    })
    describe('DELETE /carts/delete/:cartId', function () {
        it('DELETE-CARTS-DELETE-ERROR-401: should send an object of error report with 401 status code', function (done) {
            chai.request(app)
                .delete('/carts/delete/'+cartId)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res).to.be.an('object')
                    expect(res.body.err).to.have.keys(['name','source','message'])
                    expect(res.body.err.message).to.equal('jwt must be provided')
                    done()
                })
            })
        })
        describe('DELETE /carts/delete/:cartId', function () {
            it('DELETE-CARTS-DELETE-SUCCESS: should send an object of cart delete report with 200 status code', function (done) {
                chai.request(app)
                    .delete('/carts/delete/' + cartId)
                    .send({
                        "userId": userId
                    })
                    .set('jwtoken', jwt)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res).to.be.an('object')
                        expect(res.body).to.have.keys(['ok', 'deletedCount', 'n'])
                        expect(res.body.ok, res.body.deletedCount, res.body.n).to.equal(1)
                        done()
                    })
            })
        })
        describe('DELETE /carts/delete/afiasfjaf684fw64aww6f', function () {
            it('DELETE-CARTS-DELETE-ERROR-400: should send an object of error report with 400 status code', function (done) {
                chai.request(app)
                .delete('/carts/delete/afiasfjaf684fw64aww6f') // some fake cartId
                .set('jwtoken', jwt)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body.err).to.have.keys(['name', 'source', 'message'])
                    expect(res.body.err.name).to.equal('CastError')
                    done()
                })
        })
    })
    describe('GET /carts', function () {
        it('GET-CARTS-SUCCESS: should send an object of user`s carts with 200 status code', function (done) {
            chai.request(app)
            .get('/carts')
            .set('jwtoken', jwt)
            .end(function (err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                    expect(res).to.be.an('object')
                    expect(res.body).to.be.an('array')
                    done()
                })
            })
        })
        describe('GET /carts', function () {
            it('GET-CARTS-ERROR-401: should send an object of error report with 401 status code', function (done) {
                chai.request(app)
                .get('/carts')
                .end(function (err, res) {
                    console.log(res.body, 'loploplop')
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res).to.be.an('object')
                    expect(res.body.err).to.have.keys(['name','source','message'])
                    expect(res.body.err.message).to.equal('jwt must be provided')
                    done()
                })
        })
    })
})