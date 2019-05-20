const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')

chai.use(chaiHttp)

const productModel = require('../models/product')
const userModel = require('../models/user')
const TransactionModel = require('../models/transaction')
const cartModel = require('../models/cart')
let token = ''
let other_token
let product_id
let cart
let transaction_id 
let product

before( function( done ) {
    chai
        .request(app)
        .post('/users/register')
        .send({ name : 'Mang', email: 'mail@mail.com', password:'12345'})
        .end( function(err, res){
        return chai
            .request(app)
            .post('/users/login')
            .send( { email: 'mail@mail.com', password: '12345' } )
            .end( function (err, res) {
            token = res.body.token
        return chai
            .request(app)
            .post('/users/register')
            .send({ name : 'Mang', email: 'google@mail.com', password:'12345'})
            .end( function(err, res){
        return chai
            .request(app)
            .post('/users/login')
            .send( { email: 'google@mail.com', password: '12345' } )
            .end( function (err, res) {
                other_token = res.body.token
        return chai
            .request(app)
            .post('/products')
            .send({ name : 'beras', description: 'enak sekali', stock: 20, price:2000 })
            .set('token', token )
            .end( function(err, res){
                product_id = res.body._id
                product = res.body
        return chai
            .request(app)
            .post('/carts')
            .send({ product_id , qty: 2 })
            .set('token', token )
            .end( function(err, res){
                cart = res.body
                done()
                })
            })
            })    
            })
        })    
    })
})

after(function (done) {
    productModel.deleteMany({})
        .then(_ => {
            return userModel.deleteMany({})
        })
        .then(() => {
            return TransactionModel.deleteMany({})
        })
        .then(() => {
            return cartModel.deleteMany({})
        })
        .then(() => {
            done()
        })
        .catch( err => {
            console.log(err)
        })
});


describe('Transaction test', function(){
    describe('POST /transactions', function(){
        it('create transactions', function(done){
            let obj = {}
           
            chai
                .request(app)
                .get(`/carts/${cart._id}`)
                .set('token', token)
                .end( function(err, res) {
                    cart = res.body
                    cart.status = 'pay'
                    cart.shipping = {}
                    cart.seller_id = product.seller_id
               
                    return chai
                    .request(app)
                    .post('/transactions')
                    .send(cart)
                    .set('token', token )
                    .end( function(err, res){
                        transaction_id = res.body._id
                        expect(err).to.be.null;
                        expect(res).to.have.status(201);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('buyer_id')
                        expect(res.body).to.have.property('qty')
                        expect(res.body).to.have.property('status')
                        expect(res.body).to.have.property('product_id')
                        expect(res.body).to.have.property('seller_id')
                        done()
                    })
                })
              
        })
    })

    describe('PATCH /transactions', function(){
        it('update transactions', function(done) {
            chai
                .request(app)
                .patch(`/transactions/${transaction_id}`)
                .send({ status : 'done' })
                .set('token', token )
                .end( function(err, res){
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('buyer_id')
                    expect(res.body).to.have.property('qty')
                    expect(res.body).to.have.property('status')
                    expect(res.body).to.have.property('product_id')
                    done()
                })
        })
    })

    describe('GET /transactions', function(){
        it('get all transactions', function(done) {
            chai
                .request(app)
                .get(`/transactions`)
                .set('token', token )
                .end( function(err, res){
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done()
                })
        })
    })

    describe('DELETE /transactions', function(){
        it('delete transactions', function(done) {
            chai
                .request(app)
                .delete(`/transactions/${transaction_id}`)
                .set('token', token )
                .end( function(err, res){
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    done()
                })
        })
    })
})