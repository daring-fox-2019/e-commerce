const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')

chai.use(chaiHttp)

const productModel = require('../models/product')
const userModel = require('../models/user')
let token = ''
let other_token = ''
let id = ''

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
                done()
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


describe('product_test', function(){
    describe('POST /products', function(){
        it('create product should return status 201', function( done ){
            chai
                .request(app)
                .post('/products')
                .send({ name : 'beras', description: 'enak sekali', stock: 20, price:2000 })
                .set('token', token )
                .end( function(err, res){
                    id = res.body._id
                    
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('description')
                    expect(res.body).to.have.property('stock')
                    expect(res.body).to.have.property('price')
                    done()
                })
        })

        it(' error empty price field must return code 400', function( done ){
            chai
                .request(app)
                .post('/products')
                .send({ name : 'beras', description: 'enak sekali', stock: 20 })
                .set('token', token )
                .end( function(err, res){
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.be.equal('field price must not empty')
                    done()
                })
        })

        it(' error empty stock field must return code 400', function( done ){
            chai
                .request(app)
                .post('/products')
                .send({ name : 'beras', description: 'enak sekali', price: 200 })
                .set('token', token )
                .end( function(err, res){
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.be.equal('field stock must not empty')
                    done()
                })
        })

        it(' error empty stock field must return code 400', function( done ){
            chai
                .request(app)
                .post('/products')
                .send({ stock: 20 , description: 'enak sekali', price: 200 })
                .set('token', token )
                .end( function(err, res){
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.be.equal('field name must not empty')
                    done()
                })
        })

        it(' error stock less than 1 400', function( done ){
            chai
                .request(app)
                .post('/products')
                .send({ stock: -10 , description: 'enak sekali', price: 200, name:'beras' })
                .set('token', token )
                .end( function(err, res){
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.be.equal('not valid stock input')
                    done()
                })
        })

        it(' error price less than 1 400', function( done ){
            chai
                .request(app)
                .post('/products')
                .send({ stock: 10 , description: 'enak sekali', price: 0, name:'beras' })
                .set('token', token )
                .end( function(err, res){
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.be.equal('not valid price input')
                    done()
                })
        })
    })

    describe('GET /products', function(){
        it('get all products', function( done ) {
            chai
                .request(app)
                .get('/products')
                .end( function(err, res){
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done()
                })  
        })

        it('get all products per user', function(done) {
            chai
                .request(app)
                .get('/products/user')
                .set('token', token)
                .end( function(err, res){
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done()
                })  
        })
    })

    describe(' update products ', function(){
        it(' PATCH /products/:id', function( done ){
            chai
                .request(app)
                .patch(`/products/${id}`)
                .send({ stock: 20 , description: 'enak sekali', price: 200 })
                .set('token', token )
                .end( function(err, res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('stock')
                    done()
                })
        })

        it(' error update price less than 1 400', function( done ){
            chai
                .request(app)
                .patch(`/products/${id}`)
                .send({ stock: 10 , description: 'enak sekali', price: 0, name:'beras' })
                .set('token', token )
                .end( function(err, res){
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.be.equal('not valid price input')
                    done()
                })
        })

        it(' error update stock less than 0 400', function( done ){
            chai
                .request(app)
                .patch(`/products/${id}`)
                .send({ stock: -1 , description: 'enak sekali', price: 1000, name:'beras' })
                .set('token', token )
                .end( function(err, res){
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.be.equal('not valid stock input')
                    done()
                })
        })

        it('error update not have token should return status 400', function( done ){
            chai
                .request(app)
                .patch(`/products/${id}`)
                .send({ })
                .end( function(err, res){
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.be.equal('Unauthenticate')
                    done()
                })
        })

        it('error update Unauthorize', function( done ){
            chai
                .request(app)
                .delete(`/products/${id}`)
                .send({ })
                .set('token', other_token)
                .end( function(err, res){
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.be.equal('Unauthorize')
                    done()
                })
        })
    })

    describe('delete products ', function(){

        it('error delete Unauthorize', function( done ){
            chai
                .request(app)
                .delete(`/products/${id}`)
                .send({ })
                .set('token', other_token)
                .end( function(err, res){
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.be.equal('Unauthorize')
                    done()
                })
        })

        it('error delete not have token should return status 400', function( done ){
            chai
                .request(app)
                .delete(`/products/${id}`)
                .send({ })
                .end( function(err, res){
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.be.equal('Unauthenticate')
                    done()
                })
        })

        it(' DELETE /products/:id', function( done ){
            chai
                .request(app)
                .delete(`/products/${id}`)
                .send({ })
                .set('token', token )
                .end( function(err, res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('stock')
                    done()
                })
        })

    })
})
