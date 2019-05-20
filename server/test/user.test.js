const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../app'),
  clearUser = require('./helper/clearUser'),
  UserModel = require('../models/user');

let userDummy = {}

chai.use(chaiHttp)

// before(function (done) {
//   clearUser(done)
// })

// before(function (done) {
//   UserModel
//     .create({
//       username: 'dummy',
//       email: 'dummy@gmail.com',
//       password: '1234'
//     })
//     .then(function (newUser) {
//       userDummy = newUser
//       done()
//     })
//     .catch(function (error) {
//       console.log(error);
//       done()
//     })
// })


describe('User Test', function () {
  describe('/users POST', function () {
    it('should return Object new user with status code 201', function (done) {
      // this.timeout(10000)
      let input = {
        username: 'noel',
        email: 'noel@gmail.com',
        password: '1234'
      }
      chai
        .request(app)
        .post('/users/register')
        .send(input)
        .end(function (err, res) {
          console.log(res.body);
          userDummy = res.body
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
        })
    })
  })
})