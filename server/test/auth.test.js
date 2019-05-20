const chai = require('chai')
const chaiHttp = require('chai-http')
const dirtyChai = require('dirty-chai')
const jwt = require('jsonwebtoken')

const app = require('../app')
const { clearDb, createUser } = require('./helpers/db')
const { User } = require('./helpers/models')

const expect = chai.expect

chai.use(chaiHttp)
chai.use(dirtyChai)

describe('Auth Tests', function () {
  before(function (done) {
    createUser()
      .then(user => {
        this.user = user
        done()
      })
      .catch(done)
  })
  after(clearDb('User'))

  describe('POST /auth/register', function () {
    let { email, password } = new User()

    it('should send 201 status code', function (done) {
      chai
        .request(app)
        .post('/auth/register')
        .send({ email, password })
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(201)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('user')

          let { user } = body
          expect(user).to.be.an('object')
          expect(user).to.have.property('_id')
          expect(user).to.have.property('email')
          expect(user).to.not.have.property('password')
          expect(user).to.not.have.property('cart')
          expect(user.email).to.equal(email)

          done()
        })
    })

    describe('should send 422 status code when', function () {
      it('registering using the same email', function (done) {
        chai
          .request(app)
          .post('/auth/register')
          .send({ email, password })
          .end((err, res) => {
            expect(err).to.be.null()
            expect(res).to.have.status(422)

            let { body } = res
            expect(body).to.be.an('object')
            expect(body).to.have.property('message')
            expect(body.message).to.equal('User with this email is already registered, try another email')

            done()
          })
      })

      it('registering without an email', function (done) {
        chai
          .request(app)
          .post('/auth/register')
          .send({ email: undefined, password })
          .end((err, res) => {
            expect(err).to.be.null()
            expect(res).to.have.status(422)

            let { body } = res
            expect(body).to.be.an('object')
            expect(body).to.have.property('message')
            expect(body.message).to.equal('Email can\'t be empty')

            done()
          })
      })

      it('registering without a password', function (done) {
        chai
          .request(app)
          .post('/auth/register')
          .send({ email: 'some@email.com', password: undefined })
          .end((err, res) => {
            expect(err).to.be.null()
            expect(res).to.have.status(422)

            let { body } = res
            expect(body).to.be.an('object')
            expect(body).to.have.property('message')
            expect(body.message).to.equal('Password can\'t be empty')

            done()
          })
      })

      it('registering with an invalid email', function (done) {
        chai
          .request(app)
          .post('/auth/register')
          .send({ email: 'invalid_email', password })
          .end((err, res) => {
            expect(err).to.be.null()
            expect(res).to.have.status(422)

            let { body } = res
            expect(body).to.be.an('object')
            expect(body).to.have.property('message')
            expect(body.message).to.equal('Invalid Email')

            done()
          })
      })
    })
  })

  describe('POST /auth/login', function () {
    it('should send 200 status code', function (done) {
      chai
        .request(app)
        .post('/auth/login')
        .send({
          email: this.user.email,
          password: this.user.rawPassword
        })
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(200)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('user')
          expect(body).to.have.property('jwtToken')

          let { user } = body
          expect(user).to.be.an('object')
          expect(user).to.have.property('_id')
          expect(user).to.have.property('email')
          expect(user._id).to.equal(this.user.id)
          expect(user.email).to.equal(this.user.email)

          let { jwtToken } = body
          let payload = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)
          expect(payload).to.be.an('object')
          expect(payload).to.have.property('_id')
          expect(payload).to.have.property('email')
          expect(payload._id).to.equal(this.user.id)
          expect(payload.email).to.equal(this.user.email)

          done()
        })
    })

    describe('send on object with 400 status code when', function () {
      it('login without any credentials', function (done) {
        chai
          .request(app)
          .post('/auth/login')
          .send({ email: undefined, password: undefined })
          .end((err, res) => {
            expect(err).to.be.null()
            expect(res).to.have.status(400)

            let { body } = res
            expect(body).to.be.an('object')
            expect(body).to.have.property('message')
            expect(body.message).to.equal('Bad Credential')

            done()
          })
      })

      it('login with wrong credentials', function (done) {
        chai
          .request(app)
          .post('/auth/login')
          .send({ email: 'noone@email.com', password: 'notmypassword' })
          .end((err, res) => {
            expect(err).to.be.null()
            expect(res).to.have.status(400)

            let { body } = res
            expect(body).to.be.an('object')
            expect(body).to.have.property('message')
            expect(body.message).to.equal('Bad Credential')

            done()
          })
      })
    })
  })
})
