// const chai = require('chai')
var chai = require('chai')
  , chaiHttp = require('chai-http')
  , expect = chai.expect

chai.use(chaiHttp);
const app = require('../app')
var agent = chai.request.agent(app)
var token = ""
var id = ""
// before('login dulu', function(done){
//   let user = {
//     email: 'alvin@mail.com',
//     password: 'alvin',
//   }
//   chai
//       .request(app)
//       .post('/users/login')
//       .send(user)
//       .end(function(err, res) {
//         expect(err).to.be.null
//         token = res.body.token
//         done()
//       })
// })

describe("routes /users/register", function () {
  it('register berhasil /register', function (done) {
    let reqBody = {
      name: "admin",
      role: 'admin',
      email: "admin@admin.com",
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
        expect(res).to.have.status(500);
        expect(res.body.message).to.equal('Register failed : Not a valid email address');
        done();
      });
  });
})

describe("routes /users/login", function () {
  it('login berhasil /login', function (done) {
    let reqBody = {
      email: "admin@admin.com",
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
        expect(res).to.have.status(500);
        expect(res.body.message).to.equal('Login failed : Not a valid email address');
        done();
      });
  });
})


module.exports = { agent, id, token }