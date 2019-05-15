const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')

chai.use(chaiHttp)

const productModel = require('../models/product')
const userModel = require('../models/user')
let token = ''
let other_token
let product_id
let cart

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
            done()
        })
        .catch( err => {
            console.log(err)
        })
});


describe('Transaction test', function(){
    describe('POST /transactions', function(){
        it('create transactions', function(done){
            console.log(cart)
            chai
                .request(app)
                .post('/transactions')
                .send({ cart_id,  })
                .set('token', token )
                .end( function(err, res){
                    product_id = res.body._id
                    done()
                })
        })
    })
})