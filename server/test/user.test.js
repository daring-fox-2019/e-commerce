const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')

const userModel = require('../models/user')

before(function (done) {
    userModel.deleteMany({})
        .then( _ => {
            done()
        })
        .catch(err => {
            console.log(err)
        })
});

after(function (done) {
    userModel.deleteMany({})
        .then( _ => {
            done()
        })
        .catch(err => {
            console.log(err)
        })
});

chai.use(chaiHttp)

describe('user_test', function(){
    describe('POST /users/register', function(){
        it('should return an object with status code 201', function(done){
            chai
                .request(app)
                .post('/users/register')
                .send({ name : 'Mang', email: 'mail@mail.com', password:'12345'})
                .end( function(err, res){
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('password')
                    expect(res.body).to.have.property('email')
                    expect(res.body).to.have.property('role')
                    done()
                })
        })

        it('should return an error if email not unique with status code 400', function(done){
            chai
                .request(app)
                .post('/users/register')
                .send({ name : 'Mang', email: 'mail@mail.com', password:'12345'})
                .end( function(err, res){
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('email already in use')
                    done()
                })
        })

        it('should return an error if not valid email format with status code 400', function(done){
            chai
                .request(app)
                .post('/users/register')
                .send({ name : 'Mang', email: 'mail@mail', password:'12345'})
                .end( function(err, res){
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('email not valid format')
                    done()
                })
        })

        it('should return an error if email/password/name empty', function(done){
            chai
                .request(app)
                .post('/users/register')
                .send({ name : 'Mang', password:'12345'})
                .end( function(err, res){
                    
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('field must not empty')
                    done()
                })
        })
    })

    describe('POST /users/login', function(){
        it('should return an object with status code 200', function(done){
            chai
                .request(app)
                .post('/users/login')
                .send({ email: 'mail@mail.com', password:'12345'})
                .end( function(err, res){
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('token')
                    done()
                })
        })
        
        it('error if password wrong should return status 400', function(done){
            chai
                .request(app)
                .post('/users/login')
                .send({ email: 'mail@mail.com', password:'1234'})
                .end( function(err, res){
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object')
                    expect(res.body.message).to.be.equal('incorrect username/password')
                    done()
                })
        })
        
        it('error if email not registered yet return status 400', function(done){
            chai
                .request(app)
                .post('/users/login')
                .send({ email: 'mail@mail', password:'12345'})
                .end( function(err, res){
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object')
                    expect(res.body.message).to.be.equal('user not yet registered')
                    done()
                })
        })  
    })
})
