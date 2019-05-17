const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')
const jwt = require('../helpers/jwt')

chai.use(chaiHttp)
let token = null;
let productId = null;
let cartId = null;


describe.only ('Cart END POINT test', function() {

    before (function (done) {
        let newUser = {
            name: 'Paulina',
            email: "paul@gmail.com",
            role: "admin",
            password: "123456"
        }

        User.create(newUser)
        .then((user) =>{
            let {name,email,_id} = user
            jwt.sign({id : _id, email, name}, 'paulina')
            done()
        })
        .catch(err => {
            done()
        })
    })

    after(function (done) {
        Product.deleteMany({})
        .then(() => {})
        .catch(err => {done()})

        User.deleteMany({})
        .then(() => {})
        .catch(err => {done()})

        Cart.deleteMany({})
        .then(() => {done()})
        .catch(err => {console.log((err));
        })
    })




    describe('POST /users/login', function () {
        describe('success login', function () {
            it('app should return status 200 as an object with token', function (done) {
                let login = {
                    email: 'paul@gmail.com',
                    password: '123456'
                }
                chai
                .request(app)
                .post('/users/login')
                .send(login)
                .then((res) => {
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('token')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                    expect(res.body.name).to.equal('Paulina');
                    token = res.body.token
                    console.log(token, 'TOKEN DIATAS UDAH KEISIIII')     
                    done()
                })
                .catch(err => {
                    console.log(err);
                })
            })
        })
    })

    describe('POST /products', function() {
        describe('success create product', function() {
            it ('app should return status 201 as an object of new product', function (done) {
                let newProduct = {
                    price: 20000,
                    name: 'Cacing',
                    image: 'http://imageurl.cacing.com',
                    stock: 10,
                    description : 'Cacing kremi',
                    category : 'Hewani'
                }

                chai
                .request(app)
                .post('/products')
                .send(newProduct)
                .set('token', token)
                .then(res => {                    
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('image')
                    expect(res.body).to.have.property('category')
                    expect(res.body).to.have.property('stock')
                    expect(res.body.name).to.equal('Cacing');
                    expect(res.body.price).to.equal(20000)
                    expect(res.body.image).to.equal('http://imageurl.cacing.com')
                    expect(res.body.description).to.equal('Cacing kremi')
                    expect(res.body.category).to.equal('Hewani')
                    productId = res.body._id
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
            })
        })
    })
    
    describe('POST /carts', function() {
        describe('success create carts', function() {
            it ('app should return status 201 as an object of new card', function (done) {
                let newCart = {
                    userId,
                    productId: [productId, productId, productId, productId],
                    amount : productId.length * 5000
                }
                chai 
                    .request(app)
                    .send(newCart)
                    .post('/carts')
                    .set('token', token)
                    .set('cartId', cartId)
            })
        })
    })




})