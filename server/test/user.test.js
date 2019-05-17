const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const User = require('../models/user')
const jwt = require('../helpers/jwt')

chai.use(chaiHttp)
let token = ''



after(function (done) {
    User.deleteMany({}, () => {
        done()
    })
})

describe('POST /users', function () {
    describe('success create', function () {
        it('app should return status 201 and an object', function (done) {
            let newUser = {
                name: 'Paulina',
                email: "paul@gmail.com",
                role: "customer",
                password: "123456"
            }
            chai
                .request(app)
                .post('/users')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('email')
                    expect(res.body.name).to.equal('Paulina');
                    expect(res.body.email).to.equal('paul@gmail.com');
                    expect(res.body.role).to.equal('customer');
                    done()
                })
        })
    })

    describe('fail create', function () {
        it('app should return status 500 and msg empty name', function (done) {
            let newUser = {
                name: '',
                email: "paul@gmail.com",
                role: "customer",
                password: "123456"
            }
            chai
                .request(app)
                .post('/users')
                .send(newUser)
                .then(res => {
                    expect(res).to.have.status(500)
                    expect(res.body.errors.message).to.include('Name must be filled')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('email')
                    expect(res.body.name).to.equal('Paulina');
                    expect(res.body.role).to.equal('customer');
                    done()
                })
                .catch(err => {
                    done()
                })
        })

        it('app should return status 500 and msg invalid email', function (done) {
            let newUser = {
                name: 'Paulina',
                email: "paulgmail.com",
                role: "customer",
                password: "123456"
            }
            chai
                .request(app)
                .post('/users')
                .send(newUser)
                .then(res => {

                    expect(res).to.have.status(500)
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('email')
                    expect(res.body.name).to.equal('Paulina');
                    expect(res.body.role).to.equal('customer');

                    expect(res.body.errors.message).to.include('Email duplicate')
                    done()
                })
                .catch(err => {
                    done()
                })
        })

        it('app should return status 500 and msg min length of pwd of 6', function (done) {
            let newUser = {
                name: 'Paulina',
                email: "paulgmail.com",
                role: "customer",
                password: "1"
            }
            chai
                .request(app)
                .post('/users')
                .send(newUser)
                .then(res => {

                    expect(res).to.have.status(500)
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('email')
                    expect(res.body.name).to.equal('Paulina');
                    expect(res.body.role).to.equal('customer');

                    expect(res.body.errors.message).to.include('Minimum password character is 6')
                    done()
                })
                .catch(err => {
                    done()
                })
        })

        it('app should return status 500 and msg already registered email', function (done) {
            let newUser = {
                name: 'Paulina',
                email: "paulgmail.com",
                role: "customer",
                password: "123456"
            }
            chai
                .request(app)
                .post('/users')
                .send(newUser)
                .then(res => {
                    expect(res).to.have.status(500)
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('email')
                    expect(res.body.name).to.equal('Paulina');
                    expect(res.body.role).to.equal('customer');

                    expect(res.body.errors.message).to.include('registered')
                    done()
                })
                .catch(err => {
                    done()
                })
        })

        it('app should return status 500 and empty password msg', function (done) {
            let newUser = {
                name: 'davita',
                email: "paul@gmail.com",
                role: "customer",
                password: ""
            }
            chai
                .request(app)
                .post('/users')
                .send(newUser)
                .then(res => {
                    expect(res).to.have.status(500)
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('email')
                    expect(res.body.name).to.equal('davita');
                    expect(res.body.role).to.equal('customer');
                    expect(res.body.email).to.equal('pau@gmail.com');
                    expect(res.body.errors.message).to.include('Password must be filled')
                    done()
                })
                .catch(err => {
                    done()
                })
        })

    })
})


describe('POST /users/login', function () {
    describe('success login', function () {
        it('return status 200 as an object with token', function (done) {
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


                    console.log(token, 'TOKEN DIATAS UDAH KEISIIII');
                    
                    done()
                })
                .catch(err => {
                    console.log(err);
                })
        })

    })

    describe('fail login', function () {
        it('app should return status 400 and msg stating invalid username/pwd (due to no username)', function (done) {
            let login = {
                email: 'davia@gmail.com',
                password: '123456'
            }
            chai
                .request(app)
                .post('/users/login')
                .send(login)
                .then((res) => {
                    expect(res).to.be.an('object')
                    expect(res).to.have.status(400)
                    expect(res.body.message).to.include('Username/Password Invalid')
                    done()
                })
                .catch(err => {
                    console.log(error);

                })
        })

        it('app should return status 400 and msg stating invalid username/pwd (due to wrong pwd)', function (done) {
            let login = {
                email: 'paul@gmail.com',
                password: '111111'
            }
            chai
                .request(app)
                .post('/users/login')
                .send(login)
                .then((res) => {
                    expect(res).to.be.an('object')
                    expect(res).to.have.status(400)
                    expect(res.body.message).to.include('Username/Password Invalid')
                    done()
                })
                .catch(err => {
                    console.log(error);

                })
        })

        it('app should return status 400 and msg stating invalid username/pwd when fields are empty', function (done) {
            let login = {
                email: '',
                password: '123456'
            }
            chai
                .request(app)
                .post('/users/login')
                .send(login)
                .then((res) => {
                    expect(res).to.be.an('object')
                    expect(res).to.have.status(400)
                    expect(res.body.message).to.include('Username/Password Invalid')
                    done()
                })
                .catch(err => {

                })
        })

        it('app should return status 400 and msg stating invalid username/pwd when fields are empty', function (done) {
            let login = {
                email: 'paul@gmail.com',
                password: ''
            }
            chai
                .request(app)
                .post('/users/login')
                .send(login)
                .then((res) => {
                    expect(res).to.be.an('object')
                    expect(res).to.have.status(400)
                    expect(res.body.message).to.include('Username/Password Invalid')
                    done()
                })
                .catch(err => {
                    console.log(error);

                })
        })
    })
})

describe('GET /users', function () {
    it('app should return status 200 as array of object', function (done) {

        chai
            .request(app)
            .get('/users')
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res).to.have.status(200)
                done()
            })
            .catch(err => {
                console.log(err);
                
            })

    })
})