const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const clearUser = require('../helpers/clearUser')

chai.should()
chai.use(chaiHttp)

before(function (done) {
  clearUser(done)
});

let newUser = {
  name: 'tio',
  email: 'tio@gmail.com',
  password: '123'
}

let userLogin = {
  email: newUser.email,
  password: newUser.password
}

describe('User', function () {

  describe('POST /signup', function () {
    it('should send a new object user', function (done) {
      chai
        .request(app)
        .post('/user/signup')
        .send(newUser)
        .end(function (err, res) {
          res.should.to.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.name.should.be.a('string');
          res.body.name.should.equal(newUser.name)
          res.body.should.have.property('email');
          res.body.email.should.be.a('string');
          res.body.email.should.equal(newUser.email);
          res.body.should.have.property('password');
          res.body.password.should.be.a('string');
          res.body.password.should.not.equal(newUser.password);
          done();
        })
    })
  })


  describe('POST /signin', function () {
    it('should send a token', function (done) {
      chai
        .request(app)
        .post('/user/signin')
        .send(userLogin)
        .end(function (err, res) {
          res.should.to.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('token');
          res.body.token.should.be.a('string');
          done();
        })
    })
  })

})
