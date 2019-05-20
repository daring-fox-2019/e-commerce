const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')

chai.use(chaiHttp)

const productModel = require('../models/product')
const userModel = require('../models/user')
const cartModel = require('../models/cart')

let token = ''
let other_token
let product_id
let id

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
                done()
                })
                })    
            })
        })    
    })
})

// after(function (done) {
//     productModel.deleteMany({})
//         .then(_ => {
//             return userModel.deleteMany({})
//         })
//         .then(() => {
//             return cartModel.deleteMany({})
//         })
//         .then( _ => {
//             done()
//         })
//         .catch( err => {
//             console.log(err)
//         })
// });


describe('cart test', function(){
    describe('create cart', function(){
        it('POST /carts', function( done ){
            chai
                .request(app)
                .post('/carts')
                .send({ product_id , qty: 2 })
                .set('token', token )
                .end( function(err, res){
                    id = res.body._id
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('user_id')
                    expect(res.body).to.have.property('product_id')
                    done()
                })
        })

        it(' errr product id empty', function( done ) {
            chai
                .request(app)
                .post('/carts')
                .send({ qty: 2 })
                .set('token', token )
                .end( function(err, res){
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.be.equal('field product id must not empty')
                    done()
                })
        })

        it(' error qty < 1', function( done ) {
            chai
                .request(app)
                .post('/carts')
                .send({ qty: -10 , product_id })
                .set('token', token )
                .end( function(err, res){
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.be.equal('not valid stock input')
                    done()
                })
        })
    })

    describe('get all cart per user', function() {
        it('GET /carts/user', function( done ){
            chai
            .request(app)
            .get('/carts/user')
            .set('token', token )
            .end( function(err, res){
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done()
            })
        })
    })

    describe('get all', function() {
        it('GET /carts', function( done ){
            chai
            .request(app)
            .get('/carts')
            .set('token', token )
            .end( function(err, res){
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done()
            })
        })
    })

    describe('update cart', function() {
        it('PATCH /carts/:id', function( done ){
            chai
            .request(app)
            .patch(`/carts/${id}`)
            .send( { qty: 3 })
            .set('token', token )
            .end( function(err, res){
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('qty')
                expect(res.body).to.have.property('product_id')
                expect(res.body).to.have.property('_id')
                done()
            })
        })
    })

    describe('delete cart', function() {
        it('DELETE /carts/:id', function( done ){
            chai
            .request(app)
            .delete(`/carts/${id}`)
            .set('token', token )
            .end( function(err, res){
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('qty')
                expect(res.body).to.have.property('product_id')
                expect(res.body).to.have.property('_id')
                done()
            })
        })
    })

})