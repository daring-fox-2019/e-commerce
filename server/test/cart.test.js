const chai = require('chai')
const chaihttp = require('chai-http')
const { expect } = chai
const app = require('../app')
const { Product, User, Cart } = require('../models')
const { sign, verify } = require('../helpers/jwt')

chai.use(chaihttp)

let createdID
let hookUserId
let hookUserEmail
let hookUserPassword
let hookProductId
let hookCartId
let token



describe('Cart test:', function (done) {
  before(done => {
    let newUser = {
      name: 'ucup2',
      email: 'ucup2@mail.com',
      password: '12345'
    }
    hookUserEmail = newUser.email
    hookUserPassword = newUser.password
    User.create(newUser)
      .then(res => {
        // console.log({res, dari: 'hook create'})
        let { _id, name, email, role } = res
        token = sign({ _id, name, email, role })
        hookUserId = _id
        let newProduct = {
          name: 'Geforce GTX 2080 Ti',
          description: 'Graphic card',
          stock: 20,
          tag: [
            'computer'
          ],
          price: 1e6
        }
        return Product.create(newProduct)
      })
      .then(res => {
        hookProductId = res._id
        done()
      })
      .catch(err => {
        console.log({ err, dari: 'Test user before hook' })
      })
  })

  after(done => {
    Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      Cart.deleteMany({})
    ])
      .then(res => {
        done()
      })
      .catch(err => {
        console.log({ err, dari: 'User after hook' })
      })
  })

  it('ADD: Should return status code 200 with updated user\'s cart', done => {
    chai
      .request(app)
      .post(`/carts`)
      .set('token', token)
      .send({ productId: hookProductId })
      .then(res => {
        hookCartId = res.body._id
        expect(res).to.have.status(201)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('_id')
        expect(res.body).to.have.property('user')
        expect(res.body).to.have.property('product')
        done()
      })
      .catch(err => {
        console.log({ err, dari: 'Test Add to cart' })
      })
  })
  
  it('FINDALL: Should return status code 200 with list of all carts', done => {
    chai
      .request(app)
      .get(`/carts`)
      .set('token', token)
      .then(res => {
        expext(res).to.have.status(200)
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.property('_id')
        done()
      })
      .catch(err => {
        console.log({ err, dari: 'Test geat all carts'})
      })
  })
  it('REMOVE: Should return status code 200 with updated user\'s cart', done => {
    chai
      .request(app)
      .delete(`/carts/${hookCartId}`)
      .set('token', token)
      .send({ productId: hookProductId })
      .then(res => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        done()
      })
      .catch(err => {
        console.log({ err, dari: 'Test remove from cart' })
      })
  })
})