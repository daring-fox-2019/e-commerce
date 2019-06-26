const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const dirtyChai = require('dirty-chai')

const app = require('../app')
const { createUser, createItem, clearDb } = require('./helpers/db')
const { createToken } = require('./helpers/auth')

const expect = chai.expect

chai.use(chaiHttp)
chai.use(dirtyChai)

describe('Cart Tests', function () {
  beforeEach(function (done) {
    createUser()
      .then(user => {
        this.user = user
        this.user.token = createToken(user)
        return createItem(this.user)
      })
      .then(item => {
        this.item = item
        done()
      })
      .catch(done)
  })
  beforeEach(function (done) {
    createUser()
      .then(user => {
        this.otherUser = user
        this.otherUser.token = createToken(user)
        return createItem(this.otherUser)
      })
      .then(item => {
        this.otherItem = item
        this.user.cart.push(item._id)
        this.user.cart.push(item._id)
        return this.user.save()
      })
      .then(user => {
        this.user = user
        done()
      })
      .catch(done)
  })
  afterEach(clearDb('User', 'Item'))

  describe('GET /cart', function () {
    it('should send 200 status code', function (done) {
      chai
        .request(app)
        .get('/cart')
        .set('Authorization', this.user.token)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(200)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('cart')

          let { cart } = body
          expect(cart).to.be.an('array')
          expect(cart).to.have.lengthOf(2)

          let item = cart[0]
          expect(item).to.be.an('object')
          expect(item).to.have.property('_id')
          expect(item).to.have.property('name')
          expect(item).to.have.property('imageUrl')
          expect(item).to.have.property('stock')
          expect(item).to.have.property('price')
          expect(item).to.have.property('seller')

          let { seller } = item
          expect(seller).to.be.an('object')
          expect(seller).to.have.property('_id')
          expect(seller).to.have.property('email')
          expect(seller).to.not.have.property('password')

          done()
        })
    })

    describe('should send 400 status code when', function () {
      it('request to this endpoint without token', function (done) {
        chai
          .request(app)
          .get('/cart')
          .end((err, res) => {
            expect(err).to.be.null()
            expect(res).to.have.status(400)

            let { body } = res
            expect(body).to.be.an('object')
            expect(body).to.have.property('message')
            expect(body.message).to.equal('Missing Token')

            done()
          })
      })

      it('request to this endpoint with invalid token', function (done) {
        chai
          .request(app)
          .get('/cart')
          .set('Authorization', 'invalid_token')
          .end((err, res) => {
            expect(err).to.be.null()
            expect(res).to.have.status(400)

            let { body } = res
            expect(body).to.be.an('object')
            expect(body).to.have.property('message')
            expect(body.message).to.equal('Invalid Token')

            done()
          })
      })
    })
  })

  describe('PUT /cart/:item_id', function () {
    it('should send 200 status code', function (done) {
      chai
        .request(app)
        .put(`/cart/${this.otherItem.id}`)
        .set('Authorization', this.user.token)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(200)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('cart')
          expect(body.cart).to.be.an('array')

          let item = body.cart[0]
          expect(item).to.be.an('object')
          expect(item).to.have.property('_id')
          expect(item).to.have.property('name')
          expect(item).to.have.property('imageUrl')
          expect(item).to.have.property('stock')
          expect(item).to.have.property('price')
          expect(item).to.have.property('seller')

          let { seller } = item
          expect(seller).to.be.an('object')
          expect(seller).to.have.property('_id')
          expect(seller).to.have.property('email')
          expect(seller).to.not.have.property('password')

          done()
        })
    })

    describe('should send 400 status code when', function () {
      it('request to this endpoint without token', function (done) {
        chai
          .request(app)
          .put(`/cart/${this.otherItem.id}`)
          .end((err, res) => {
            expect(err).to.be.null()
            expect(res).to.have.status(400)

            let { body } = res
            expect(body).to.be.an('object')
            expect(body).to.have.property('message')
            expect(body.message).to.equal('Missing Token')

            done()
          })
      })

      it('request to this endpoint with invalid token', function (done) {
        chai
          .request(app)
          .put(`/cart/${this.otherItem.id}`)
          .set('Authorization', 'invalid_token')
          .end((err, res) => {
            expect(err).to.be.null()
            expect(res).to.have.status(400)

            let { body } = res
            expect(body).to.be.an('object')
            expect(body).to.have.property('message')
            expect(body.message).to.equal('Invalid Token')

            done()
          })
      })
    })

    it('should send 403 status code when seller add his/her own item into their cart', function (done) {
      chai
        .request(app)
        .put(`/cart/${this.item.id}`)
        .set('Authorization', this.user.token)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(403)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('message')
          expect(body.message).to.equal('Can\'t add your own item')

          done()
        })
    })

    it('should send 404 status code when item can\'t be found', function (done) {
      chai
        .request(app)
        .put(`/cart/${mongoose.Types.ObjectId()}`)
        .set('Authorization', this.user.token)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(404)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('message')
          expect(body.message).to.equal('Item Not Found')

          done()
        })
    })
  })

  describe('DELETE /cart/:item_id', function () {
    it('should send 200 status code', function (done) {
      chai
        .request(app)
        .delete(`/cart/${this.otherItem.id}`)
        .set('Authorization', this.user.token)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(200)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('cart')
          expect(body.cart).to.be.an('array')

          let item = body.cart[0]
          expect(item).to.be.an('object')
          expect(item).to.have.property('_id')
          expect(item).to.have.property('name')
          expect(item).to.have.property('imageUrl')
          expect(item).to.have.property('stock')
          expect(item).to.have.property('price')
          expect(item).to.have.property('seller')

          let { seller } = item
          expect(seller).to.be.an('object')
          expect(seller).to.have.property('_id')
          expect(seller).to.have.property('email')
          expect(seller).to.not.have.property('password')

          done()
        })
    })

    describe('should send 400 status code when', function () {
      it('request to this endpoint without token', function (done) {
        chai
          .request(app)
          .delete(`/cart/${this.otherItem.id}`)
          .end((err, res) => {
            expect(err).to.be.null()
            expect(res).to.have.status(400)

            let { body } = res
            expect(body).to.be.an('object')
            expect(body).to.have.property('message')
            expect(body.message).to.equal('Missing Token')

            done()
          })
      })

      it('request to this endpoint with invalid token', function (done) {
        chai
          .request(app)
          .delete(`/cart/${this.otherItem.id}`)
          .set('Authorization', 'invalid_token')
          .end((err, res) => {
            expect(err).to.be.null()
            expect(res).to.have.status(400)

            let { body } = res
            expect(body).to.be.an('object')
            expect(body).to.have.property('message')
            expect(body.message).to.equal('Invalid Token')

            done()
          })
      })
    })

    it('should send 404 status code when item can\'t be found', function (done) {
      chai
        .request(app)
        .delete(`/cart/${mongoose.Types.ObjectId()}`)
        .set('Authorization', this.user.token)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(404)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('message')
          expect(body.message).to.equal('Item Not Found')

          done()
        })
    })
  })

  describe('DELETE /cart', function () {
    it('should send 204 status code', function (done) {
      chai
        .request(app)
        .delete('/cart')
        .set('Authorization', this.user.token)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(204)

          done()
        })
    })

    describe('should send 400 status code when', function () {
      it('request to this endpoint without token', function (done) {
        chai
          .request(app)
          .delete('/cart')
          .end((err, res) => {
            expect(err).to.be.null()
            expect(res).to.have.status(400)

            let { body } = res
            expect(body).to.be.an('object')
            expect(body).to.have.property('message')
            expect(body.message).to.equal('Missing Token')

            done()
          })
      })

      it('request to this endpoint with invalid token', function (done) {
        chai
          .request(app)
          .delete('/cart')
          .set('Authorization', 'invalid_token')
          .end((err, res) => {
            expect(err).to.be.null()
            expect(res).to.have.status(400)

            let { body } = res
            expect(body).to.be.an('object')
            expect(body).to.have.property('message')
            expect(body.message).to.equal('Invalid Token')

            done()
          })
      })
    })
  })

  describe('POST /cart', function () {
    it('should send 201 status code', function (done) {
      chai
        .request(app)
        .post('/cart')
        .set('Authorization', this.user.token)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(201)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('transaction')

          let { transaction } = body
          expect(transaction).to.be.an('object')
          expect(transaction).to.have.property('_id')
          expect(transaction).to.have.property('owner')
          expect(transaction).to.have.property('cart')
          expect(transaction).to.have.property('paid')
          expect(transaction.paid).to.equal(0)

          let { owner } = transaction
          expect(owner).to.be.an('object')
          expect(owner).to.have.property('_id')
          expect(owner).to.have.property('email')
          expect(owner).to.not.have.property('password')

          let { cart } = transaction
          expect(cart).to.be.an('array')
          expect(cart[0]).to.be.an('object')
          expect(cart[0]).to.have.property('_id')
          expect(cart[0]).to.have.property('item')
          expect(cart[0]).to.have.property('status')
          expect(cart[0]).to.have.property('count')

          let { item } = cart[0]
          expect(item).to.be.an('object')
          expect(item).to.have.property('_id')
          expect(item).to.have.property('name')
          expect(item).to.have.property('imageUrl')
          expect(item).to.have.property('stock')
          expect(item).to.have.property('price')
          expect(item).to.have.property('seller')

          done()
        })
    })

    describe('should send 400 status code when', function () {
      it('request to this endpoint without token', function (done) {
        chai
          .request(app)
          .post('/cart')
          .end((err, res) => {
            expect(err).to.be.null()
            expect(res).to.have.status(400)

            let { body } = res
            expect(body).to.be.an('object')
            expect(body).to.have.property('message')
            expect(body.message).to.equal('Missing Token')

            done()
          })
      })

      it('request to this endpoint with invalid token', function (done) {
        chai
          .request(app)
          .post('/cart')
          .set('Authorization', 'invalid_token')
          .end((err, res) => {
            expect(err).to.be.null()
            expect(res).to.have.status(400)

            let { body } = res
            expect(body).to.be.an('object')
            expect(body).to.have.property('message')
            expect(body.message).to.equal('Invalid Token')

            done()
          })
      })
    })

    it('should send 404 when checkout an empty cart', function (done) {
      this.user.cart = []
      this.user.save()
        .then(user => {
          this.user = user
          chai
            .request(app)
            .post('/cart')
            .set('Authorization', this.user.token)
            .end((err, res) => {
              expect(err).to.be.null()
              expect(res).to.have.status(404)

              let { body } = res
              expect(body).to.be.an('object')
              expect(body).to.have.property('message')
              expect(body.message).to.equal('Can\'t checkout empty cart')

              done()
            })
        })
        .catch(done)
    })
  })
})
