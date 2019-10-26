const chai = require('chai')
const chaihttp = require('chai-http')
const { expect } = chai
const app = require('../app')
const { Product } = require('../models')

chai.use(chaihttp)

let createdID

before(done => {
  Product.create({
    name: 'Playstation 86',
    description: 'keluaran baru tahun 2083',
    price: 5e6,
    featuredImg: '',
    stock: 10,
    tags: [
      'console'
    ]
  })
    .then(product => {
      done()
    })
    .catch(err => {
      console.log({ err })
    })
})

after(done => {
  Product.deleteMany({})
    .then(() => {
      done()
    })
    .catch(err => {
      console.log({ err })
    })
})

describe('CRUD Product', function(done) {
  // this.timeout(5000)
  it('CREATE: Should return status code 201 with created product in the response body', function(done) {
    let newProduct = {
      name: 'Barang 1',
      description: 'Description for barang 1',
      price: 1e4,
      featuredImg: '',
      stock: 25,
      tags: [
        'barang bagus'
      ]
    }

    chai
      .request(app)
      .post('/products')
      .send(newProduct)
      .then(res => {
        createdID = res.body._id
        expect(res).to.have.status(201)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('_id')
        expect(res.body).to.have.property('name')
        expect(res.body).to.have.property('description')
        expect(res.body).to.have.property('price')
        expect(res.body).to.have.property('featuredImg')
        expect(res.body).to.have.property('stock')
        expect(res.body).to.have.property('tags')

        expect(res.body.name).to.be.equal('Barang 1')
        expect(res.body.description).to.be.equal('Description for barang 1')
        expect(res.body.price).to.be.equal(1e4)
        expect(res.body.stock).to.be.equal(25)
        expect(res.body.tags).to.be.an('array')
        done()
      })
      .catch(err => {
        console.log({err, dari: 'Test CREATE'})
      })
  })

  it('READ: Should return array of Objects with status code 200', done => {
    chai
      .request(app)
      .get('/products')
      .then(res => {
        expect(res).to.have.status(200)
        // expect(res.body).to.be.an('array')
        expect(res.body[0]).to.have.property('_id')
        expect(res.body[0]).to.have.property('name')
        expect(res.body[0]).to.have.property('description')
        expect(res.body[0]).to.have.property('price')
        expect(res.body[0]).to.have.property('featuredImg')
        expect(res.body[0]).to.have.property('stock')
        expect(res.body[0]).to.have.property('tags')
        done()
      })
      .catch(err => {
        console.log({err, dari: 'Test READ'})
      })
  })

  it('UPDATE: Should return object of updated product with staus code 200', done => {
    chai
      .request(app)
      .put(`/products/${createdID}`)
      .send({ name: 'Nama terganti'})
      .then(res => {
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('_id')
        expect(res.body).to.have.property('name')
        expect(res.body).to.have.property('description')
        expect(res.body).to.have.property('price')
        expect(res.body).to.have.property('featuredImg')
        expect(res.body).to.have.property('stock')
        expect(res.body).to.have.property('tags')
        expect(res.body.name).to.equal('Nama terganti')
        done()
      })
      .catch(err => {
        console.log({ err, dari: 'Test UPDATE'})
      })
  })
  it('DELETE: Should return status 200', done => {
    chai
      .request(app)
      .delete(`/products/${createdID}`)
      .then(res => {
        expect(res).to.have.status(200) //! 204 apa 200? coba ditanya besok
        done()
      })
      .catch(err => {
        console.log({ err, dari: 'Test DELETE'})
      })
  })
})