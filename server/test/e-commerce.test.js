const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')

chai.use(chaiHttp)

describe('E-commerce test', function() {

  describe('product test', function() {
    // describe('POST /register', function() {
    //   it('should send an object with 201 status code', function(done) {
    //     let newUser = {
    //       name : 'Rizky Anas',
    //       email : 'nyunk@mail.com',
    //       password : 'lalala'
    //     }
    //     chai
    //       .request(app)
    //       .post('/register')
    //       .send()
    //   }) 
    // })
  
    // describe('POST /login', function() {
    //   it('should send an object with 200 status code', function(done) {
    //     let option = {
    //       email : 'haha@mail.com',
    //       password : 'lalala'
    //     }
    //     chai
    //       .request(app)
    //       .post('/login')
    //       .send()
    //   })
    // })
  
    // describe('POST /register', function() {
  
    // })
  
    // describe('GET /products', function() {
    //   it('should send an array with 200 status code', function(done) {
    //     chai
    //       .request(app)
    //       .get('/products')
    //       .end(function(err, res) {
    //         expect(err).to.be.null
    //         expect(res).to.have.status(200)
    //         expect(res.body).to.be.an('array')
    //         done()
    //       })
    //   })
    // })
  
    // describe('GET /products/:id', function() {
    //   it('should send an object with 200 status code', function(done) {
    //     const id = '5cd91eace07dea62067d5ca4'      
    //     chai
    //       .request(app)
    //       .get(`/products/${id}`)
    //       .end(function(err, res) {
    //         expect(err).to.be.null
    //         expect(res).to.have.status(200)
    //         expect(res.body).to.be.an('object')
    //         expect(res.body).to.have.property('_id')
    //         expect(res.body).to.have.property('name')
    //         expect(res.body).to.have.property('images')
    //         expect(res.body).to.have.property('description')
    //         expect(res.body).to.have.property('price')
    //         expect(res.body).to.have.property('seller')
    //         done()
    //       })
    //   })
    // })
  
    // describe('POST /products', function() {
    //   it('should send an object of inserted product with 201 status code', function(done) {
    //     const newProduct = {
    //       name: 'Tes',
    //       images: 'https://www.gizmochina.com/wp-content/uploads/2019/03/Sony-Xperia-1-600x482.jpg',
    //       description: 'Product tes',
    //       price: 10000,
    //       seller: 'Mamang Kesbor'
    //     }
    //     chai
    //       .request(app)
    //       .post('/products')
    //       .send(newProduct)
    //       .end(function(err, res) {
    //         expect(err).to.be.null
    //         expect(res).to.have.status(201)
    //         expect(res.body).to.be.an('object')
    //         expect(res.body).to.have.property('_id')
    //         expect(res.body).to.have.property('name')
    //         expect(res.body).to.have.property('images')
    //         expect(res.body).to.have.property('description')
    //         expect(res.body).to.have.property('price')
    //         expect(res.body).to.have.property('seller')
    //         done()
    //       })
    //   })
    // })
  
    // describe('PUT /products/:id', function() {
    //   it('should send an object of successed updating product with 200 status code', function (done) {
    //     const id = '5cd91e88e105ab61b87d31a1'
    //     const option = {
    //       name: 'Tes2',
    //       images: 'https://www.gizmochina.com/wp-content/uploads/2019/03/Sony-Xperia-1-600x482.jpg',
    //       description: 'Product tes',
    //       price: 1000000,
    //       seller: 'Mamang Kesbir'
    //     }
    //     chai
    //       .request(app)
    //       .put(`/products/${id}`)
    //       .send(option)
    //       .end(function (err, res) {
    //         expect(err).to.be.null
    //         expect(res).to.have.status(200)
    //         done()
    //       })
  
    //   })
    // })
  
    // describe('DELETE /products/:id', function() {
    //   it('should send an object of successed deleting product with 200 status code', function (done) {
    //     const id = '5cd91eace07dea62067d5ca4'
    //     chai
    //       .request(app)
    //       .delete(`/products/${id}`)
    //       .end(function (err,res) {
    //         expect(err).to.be.null
    //         expect(res).to.have.status(200)
    //         done()
    //       })
    //   })
    // })

  })


  

})