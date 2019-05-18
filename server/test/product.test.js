const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

const app = require('../app');
const Product = require('../models/product');
const User = require('../models/user');
const clearProduct = require('../helpers/clearProduct');
const jwt = require('../helpers/jwt');
const jwtGen = require('jsonwebtoken');

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

  describe('POST /products', function() {
    let token = null;
    before(function(done) {
      const inputUser = {
        name: 'Admin',
        email: 'admin@mail.com',
        password: '123456',
        role: 'admin'
      }
      User.create(inputUser)
        .then(newUser => {
          const { name, email, role } = newUser;
          token = jwt.sign({
            name, email, role
          })
          done();
        })
        .catch(err => {
          throw err;
        })
    })
    describe('SUCCESS', function() {
      it('should response an object (message and newProduct) with status 201', function(done) {
        const inputProduct = {
          name: 'New Product',
          description: 'New Description',
          price: '100',
          stock: '10',
        }
        chai
          .request(app)
          .post('/products')
          .set({ token })
          .send(inputProduct)
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('newProduct');
            expect(res.body.newProduct).to.have.property('_id');
            expect(res.body.newProduct).to.have.property('name');
            expect(res.body.newProduct).to.have.property('description');
            expect(res.body.newProduct).to.have.property('price');
            expect(res.body.newProduct).to.have.property('stock');
            expect(res.body.newProduct).to.have.property('imageURL');
            expect(res.body.newProduct).to.have.property('created');
            expect(res.body.newProduct).to.have.property('updated');
            expect(res.body.newProduct.price >= 0).to.equal(true);
            expect(res.body.newProduct.stock >= 0).to.equal(true);
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
    })
    describe('ERROR', function() {
      let tokenUser = null;
      let tokenNotAllowed = jwtGen.sign({
        name: 'Admin',
        email: 'admin@mail.com',
        role: 'admin'
      }, 'fake')
      let tokenNotRecognized = jwt.sign({
        name: 'Admin',
        email: 'admin1@mail.com',
        role: 'admin'
      })

      before(function(done) {
        const inputUser = {
          name: 'New User',
          email: 'user@mail.com',
          password: '123456',
          role: 'customer'
        }
        User.create(inputUser)
          .then(newUser => {
            const { name, email, role } = newUser;
            tokenUser = jwt.sign({
              name, email, role
            })
            done();
          })
          .catch(err => {
            throw err;
          })
      })
      it('should response an object (message: Product validation failed: price or stock can not be negative) with status 400', function(done) {
        const inputProduct = {
          name: 'New Product',
          description: 'New Description',
          price: '-1',
          stock: '-1',
        }
        chai
          .request(app)
          .post('/products')
          .set({ token })
          .send(inputProduct)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
      it('should response an object (message: no token assigned) with status 400', function(done) {
        const inputProduct = {
          name: 'New Product',
          description: 'New Description',
          price: '100',
          stock: '10',
        }
        chai
          .request(app)
          .post('/products')
          .send(inputProduct)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
      it('should response an object (message: not allowed to access) with status 400. Note: wrong secret jwt', function(done) {
        const inputProduct = {
          name: 'New Product',
          description: 'New Description',
          price: '100',
          stock: '10',
        }
        chai
          .request(app)
          .post('/products')
          .set({ token: tokenNotAllowed })
          .send(inputProduct)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
      it('should response an object (message: not recognized input data) with status 400. Note: not registered in database', function(done) {
        const inputProduct = {
          name: 'New Product',
          description: 'New Description',
          price: '100',
          stock: '10',
        }
        chai
          .request(app)
          .post('/products')
          .set({ token: tokenNotRecognized })
          .send(inputProduct)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
      it('should response an object (message: unauthorized to access) with status 401.', function(done) {
        const inputProduct = {
          name: 'New Product',
          description: 'New Description',
          price: '100',
          stock: '10',
        }
        chai
          .request(app)
          .post('/products')
          .set({ token: tokenUser })
          .send(inputProduct)
          .then(res => {
            expect(res).to.have.status(401);
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
