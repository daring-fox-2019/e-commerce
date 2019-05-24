// const chai = require('chai')
var chai = require('chai')
  , chaiHttp = require('chai-http')
  , expect = chai.expect

chai.use(chaiHttp);
const app = require('../app')
var agent = chai.request.agent(app)
var token = ""
var id = ""
const User = require('../models/user')

describe("routes /users/register", function () {
  before('delete user',function(done){
    User.findOneAndDelete({email: 'admin@mail.com'})
    .then(result =>{
      done()
    })
    .catch(err =>{
      done(err)
    })
  })
  it('register berhasil /register', function (done) {
    let reqBody = {
      name: "admin",
      role: 'admin',
      email: "admin@mail.com",
      password: "adminaja",
    }
    agent
      .post('/users/register')
      .send(reqBody)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
      });
  });

  it('format email salah /register', function (done) {
    let reqBody = {
      name: "Alvin",
      role: 'admin',
      email: "alvin",
      password: "alvin",
    }
    agent
      .post('/users/register')
      .send(reqBody)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('Not a valid email address');
        done();
      });
  });
})

describe("routes /users/login", function () {
  it('login berhasil /login', function (done) {
    let reqBody = {
      email: "admin@mail.com",
      password: "adminaja",
    }
    agent
      .post('/users/login')
      .send(reqBody)
      .end(function (err, res) {
        // expect(res).to.have.cookie('sessionid');
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        token = res.body.token
        done();
      });
  });
  // errornya HTTP 404 : "Email not found, please register first" kalau pake done()
  it('format email salah /login', function (done) {
    let reqBody = {
      email: "admin",
      password: "admin",
    }
    agent
      .post('/users/login')
      .send(reqBody)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('Email not found, please register first');
        done()
      });
  });
  it('password salah /login', function (done) {
    let reqBody = {
      email: "admin@mail.com",
      password: "yuhu",
    }
    agent
      .post('/users/login')
      .send(reqBody)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(403);
        expect(res.body.message).to.equal('Email atau password salah');
        done()
      });
  });
})