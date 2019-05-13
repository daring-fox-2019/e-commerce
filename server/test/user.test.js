const chai = require('chai')
const chaihttp = require('chai-http')
const { expect } = chai
const app = require('../app')
const { Product, User } = require('../models')

chai.use(chaihttp)

let createdID
let hookUserId
let hookProductId

before(done => {
  let newUser = {
    name: 'ucup',
    email: 'ucup2@mail.com',
    password: '12345'
  }
  User.create(newUser)
    .then(res => {
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
      done()
    })
    .catch(err => {
      console.log({ err, dari: 'Test user before hook' })
    })
})

after(done => {
  User.deleteMany({})
    .then(res => {
      done()
    })
    .catch(err => {
      console.log({ err, dari: 'User after hook' })
    })
})

describe('User CRUD test:', function (done) {
  this.timeout(5000)
  it('CREATE (Register): Should return status 201 with object created user', done => {
    let newUser = {
      name: 'Muhammad Yusuf',
      email: 'ucup@mail.com',
      password: 'password',
    }
    chai
      .request(app)
      .post('/users/register')
      .send(newUser)
      .then(res => {
        createdID = res.body._id
        expect(res).to.have.status(201)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('_id')
        expect(res.body).to.have.property('name')
        expect(res.body).to.have.property('email')
        expect(res.body).to.have.property('password')
        expect(res.body).to.have.property('carts')
        expect(res.body).to.have.property('role')

        expect(res.body.name).to.be.equal('Muhammad Yusuf')
        expect(res.body.email).to.be.equal('ucup@mail.com')
        expect(res.body.password).to.not.be.equal('password')
        done()
      })
      .catch(err => {
        console.log({ err, dari: 'Test Register' })
      })
  })

  it('READ: Should return array of user objects with status 200', done => {
    chai
      .request(app)
      .get('/users')
      .then(res => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('array')
        done()
      })
      .catch(err => {
        console.log({ err, dari: 'Test Get Users' })
      })
  })

  it('UPDATE: Should return status code 200 with body of updated user', done => {
    let updateData = {
      name: 'Kosasih',
      email: 'kosasih@mail.com'
    }
    chai
      .request(app)
      .put(`/users/${createdID}`)
      .send(updateData)
      .then(res => {
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('_id')
        expect(res.body).to.have.property('name')
        expect(res.body).to.have.property('email')
        expect(res.body).to.have.property('password')
        expect(res.body).to.have.property('role')
        expect(res.body).to.have.property('carts')

        expect(res.body.name).to.be.a('string')
        expect(res.body.email).to.be.a('string')
        expect(res.body.name).to.equal('Kosasih')
        expect(res.body.email).to.equal('kosasih@mail.com')
        done()
      })
      .catch(err => {
        console.log({ err, dari: 'Test Update User' })
      })
  })

  it('DELETE: Should return status 204', done => {
    chai
      .request(app)
      .delete(`/users/${createdID}`)
      .then(res => {
        expect(res).to.have.status(200) //! 200 atau 204?
        expect(res.body).to.be.an('object')
        done()
      })
      .catch(err => {
        console.log({ err, dari: 'Test delete user' })
      })
  })
})

describe('Cart test:' , function(done) {
  it('ADD: Should return status code 200 with updated user\'s cart', res => {
    chai
      .request(app)
      .put(`/users/cart/${hookProductId}`)
      .send({ method: 'add'})
      .then(res => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('_id')
        expect(res.body).to.have.property('name')
        expect(res.body).to.have.property('email')
        expect(res.body).to.have.property('carts')

        expect(res.body.carts.length).to.not.equal(0)
        done()
      })
      .catch(err => {
        console.log({ err, dari: 'Test Add to cart'})
      })
  })
  it('REMOVE: Should return status code 200 with updated user\'s cart', res => {
    chai
      .request(app)
      .put(`/users/cart${hookProductId}`)
      .send({ method: 'remove' })
      .then(res => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('_id')
        expect(res.body).to.have.property('name')
        expect(res.body).to.have.property('email')
        expect(res.body).to.have.property('carts')

        expect(res.body.carts.length).to.equal(0)
        done()
      })
      .catch(err => {
        console.log({ err, dari: 'Test remove from cart'})
      })
  })
})