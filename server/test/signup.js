const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const clearUser = require('../helpers/clearUser')
chai.use(chaiHttp)


before(function(done) {
    clearUser(done)
  });
  
  after(function(done) {
    clearUser(done);
  });

let token = '$2a$10$cZ6OFZQDoMeYT5WQ676hmuVMWS9RUjXZUVf23q0DJw0qg2X6QLVM6'

describe('e-commerce test', function () {

    describe('POST /admin/signup', function () {
        it('should send an object inserted signup with 201 status code', function (done) {
            const signup = {
                name : 'role',
                email: 'john@mail.com',
                password: 'naruto',
                phone : '08187654389'
            }
            chai.request(app).post('/signup').send(signup)
            .end(function (err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('name')
                expect(res.body).to.have.property('email')
                expect(res.body).to.have.property('password')
                expect(res.body.name).to.equal(signup.name)
                expect(res.body.email).to.equal(signup.email)
                done()
                
            })
        })
        
    })

    describe('POST /login', function () {
        it('should send an email column true', function (done) {
            const login = {
                email: "helga@mail.com",
                password: "naruto",
            }
            chai.request(app).post('/login').send(login)
            .end( function(err, res){
                expect(err).to.be.null
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('token')
                expect(res.body.email).to.equal(login.email)
                expect(res.body.password).to.equal(login.password)
                done()
            }) 
        })
        
    })

    describe('POST /admin', function () {
        it('should send an object with 201', function (done) {
            chai.request(app).post('/admin')
            .end( function(err, res){
                expect(err).to.be.null
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('name')
                expect(res.body).to.have.property('image')
                expect(res.body).to.have.property('price')
                expect(res.body).to.have.property('stock')
                done()
            }) 
        })
        
    })

    describe('GET /admin', function () {
        it('should send an Array with status 200', function (done) {
            chai.request(app).get('/admin')
            .end( function(err, res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
                done()
            }) 
        })
        
    })

    describe('GET /admin', function () {
        it('should send an object with status 200', function (done) {
            chai.request(app).get('/admin/:id')
            .end( function(err, res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
                done()
            }) 
        })
        
    })

    describe('PUT /admin', function () {
        it('should send an object with status 200', function (done) {
            chai.request(app).put('/admin/:id')
            .end( function(err, res){
                expect(err).to.be.null
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                done()
            }) 
        })
        
    })

    describe('DELETE /admin', function () {
        it('should send an object with status 200', function (done) {
            chai.request(app).delete('/admin/:id')
            .end( function(err, res){
                expect(err).to.be.null
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                done()
            }) 
        })
        
    })

    describe('POST /upload', function () {
        it('should send an object with status 200', function (done) {
            chai.request(app).post('/admin/:id')
            .end( function(err, res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                done()
            }) 
        })
        
    })

    describe('POST /cart', function () {
        it('should send an object with status 200', function (done) {
            chai.request(app).post('/cart/')
            .end( function(err, res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                done()
            }) 
        })
        
    })


    
})

