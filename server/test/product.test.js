const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

const app = require('../app');
const Product = require('../models/product');
const clearProduct = require('../helpers/clearProduct');

after(function(done) {
  clearProduct(done);
})

describe('PRODUCT', function() {
  describe('GET /products and GET /products/:id', function() {
    let productId = null;
    describe('SUCCESS', function() {
      before(function(done) {
        Product.create({
          name: 'product',
          description: 'description',
          price: 100,
          stock: 0,
          imageURL: './assets/noPhoto.png',
          created: new Date(),
          updated: new Date()
        })
          .then(function(newProduct) {
            productId = newProduct._id;
            done();
          })
          .catch(function(err) {
            throw err
          })
      })
      after(function(done) {
        clearProduct(done);
      })
      it('should response an object (message, products) with status 200', function(done) {
        chai
          .request(app)
          .get('/products')
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('products');
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
      it('should response an object (message, product) with status 200', function(done) {
        chai
          .request(app)
          .get(`/products/${productId}`)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('product');
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
    })
    describe('ERROR', function() {
      it('should response an object (message) with status 404', function(done) {
        chai
          .request(app)
          .get('/products')
          .then(res => {
            expect(res).to.have.status(404);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
      it('should response an object (message) with status 404', function(done) {
        chai
          .request(app)
          .get(`/products/${productId}`)
          .then(res => {
            expect(res).to.have.status(404);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
    })
  })
})
