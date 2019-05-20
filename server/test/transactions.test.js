const chai = require('chai')
const chaiHttp = require('chai-http')
const dirtyChai = require('dirty-chai')

const app = require('../app')
const { clearDb, createUser, createItem, createTransaction } = require('./helpers/db')
const { createToken } = require('./helpers/auth')

const expect = chai.expect

chai.use(chaiHttp)
chai.use(dirtyChai)

describe('Transaction Tests', function () {
  before(function (done) {
    createUser()
      .then(user => {
        this.otherUser = user
        return createItem(user)
      })
      .then(item => {
        this.otherItem = item
        return createUser()
      })
      .then(user => {
        user.cart.push(this.otherItem._id)
        return user.save()
      })
      .then(user => {
        this.user = user
        this.user.token = createToken(user)
        return createTransaction(user)
      })
      .then(transaction => {
        this.transaction = transaction
        done()
      })
      .catch(done)
  })
  after(clearDb('Item', 'User', 'Transaction'))

  describe('GET /transactions', function () {
    it('should send 200 status code', function (done) {
      chai
        .request(app)
        .get('/transactions')
        .set('Authorization', this.user.token)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(200)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('transactions')
          expect(body.transactions).to.be.an('array')
          expect(body.transactions).to.have.lengthOf(1)

          let transaction = body.transactions[0]
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
  })
})
