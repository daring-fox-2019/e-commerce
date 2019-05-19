const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

const app = require('../app');
const Product = require('../models/product');
const User = require('../models/user');
const clearProduct = require('../helpers/clearProduct');
const clearUser = require('../helpers/clearUser');
const jwt = require('../helpers/jwt');
const jwtGen = require('jsonwebtoken');

after(function(done) {
  clearProduct(done);
})

describe('PRODUCT', function() {
  let token = null;
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
  let productId = null;

  after(function(done) {
    clearUser(done);
  })

  describe('GET /products and GET /products/:id', function() {
    describe('SUCCESS', function() {
      before(function(done) {
        Product.create({
          name: 'Trial Product',
          description: 'Description',
          price: 100,
          stock: 10,
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
            expect(res.body.newProduct.price).to.be.a('number');
            expect(res.body.newProduct.price >= 0).to.equal(true);
            expect(res.body.newProduct.stock).to.be.a('number');
            expect(res.body.newProduct.stock >= 0).to.equal(true);
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
    })
    describe('ERROR', function() {
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
      describe('VALIDATION', function() {
        it('should response an object (message: Product validation failed: name or price or stock: required) with status 400', function(done) {
          const inputProduct = {
            name: '',
            description: 'New Description',
            price: null,
            stock: null,
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
        it('should response an object (message: Product validation failed: price or stock: minimum 0) with status 400', function(done) {
          const inputProduct = {
            name: 'New Product',
            description: 'New Description',
            price: -1,
            stock: -1,
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
      })
      describe('AUTHENTICATION', function() {
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
      })
      describe('AUTHORIZATION', function() {
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

  describe('PUT PATCH DELETE /products/:id', function() {
    describe('SUCCESS', function() {
      before(function(done) {
        Product.create({
          name: 'Trial Product',
          description: 'Description',
          price: 100,
          stock: 10,
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

      it('should response an object (message and updatedProduct) with status 201. Note: UPDATE PUT', function(done) {
        const inputProduct = {
          name: 'Trial Product edited',
          description: 'Description edited with PUT',
          price: 1000,
          stock: 100,
        }
        chai
          .request(app)
          .put(`/products/${productId}`)
          .set({ token })
          .send(inputProduct)
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('updatedProduct');
            expect(res.body.updatedProduct).to.have.property('_id');
            expect(res.body.updatedProduct).to.have.property('name');
            expect(res.body.updatedProduct).to.have.property('description');
            expect(res.body.updatedProduct).to.have.property('price');
            expect(res.body.updatedProduct).to.have.property('stock');
            expect(res.body.updatedProduct).to.have.property('imageURL');
            expect(res.body.updatedProduct).to.have.property('updated');
            expect(res.body.updatedProduct.price >= 0).to.equal(true);
            expect(res.body.updatedProduct.stock >= 0).to.equal(true);
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
      it('should response an object (message and updatedProduct) with status 201. Note: UPDATE PATCH', function(done) {
        const inputProduct = {
          description: 'Description edited with PATCH',
          stock: 10,
        }
        chai
          .request(app)
          .patch(`/products/${productId}`)
          .set({ token })
          .send(inputProduct)
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('updatedProduct');
            expect(res.body.updatedProduct).to.have.property('_id');
            expect(res.body.updatedProduct).to.have.property('name');
            expect(res.body.updatedProduct).to.have.property('description');
            expect(res.body.updatedProduct).to.have.property('price');
            expect(res.body.updatedProduct).to.have.property('stock');
            expect(res.body.updatedProduct).to.have.property('imageURL');
            expect(res.body.updatedProduct).to.have.property('updated');
            expect(res.body.updatedProduct.price >= 0).to.equal(true);
            expect(res.body.updatedProduct.stock >= 0).to.equal(true);
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
      it('should response an object (message and deletedProduct) with status 200. Note: DELETE', function(done) {
        chai
          .request(app)
          .delete(`/products/${productId}`)
          .set({ token })
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('deletedProduct');
            expect(res.body.deletedProduct).to.have.property('_id');
            expect(res.body.deletedProduct).to.have.property('name');
            expect(res.body.deletedProduct).to.have.property('description');
            expect(res.body.deletedProduct).to.have.property('price');
            expect(res.body.deletedProduct).to.have.property('stock');
            expect(res.body.deletedProduct).to.have.property('imageURL');
            expect(res.body.deletedProduct).to.have.property('updated');
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
    })
    describe('ERROR', function() {
      before(function(done) {
        Product.create({
          name: 'Trial Product',
          description: 'Description',
          price: 100,
          stock: 10,
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

      describe('VALIDATION', function() {
        it('should response an object (message: Product validation failed: name or price or stock: required) with status 400. Note: UPDATE PUT', function(done) {
          const inputProduct = {
            name: '',
            description: 'Description edited from PUT',
            price: null,
            stock: null,
          }
          chai
            .request(app)
            .put(`/products/${productId}`)
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
        it('should response an object (message: Product validation failed: price or stock: minimum 0) with status 400. Note: UPDATE PUT', function(done) {
          const inputProduct = {
            name: 'Trial Product edited',
            description: 'Description edited from PUT',
            price: -1,
            stock: -1,
          }
          chai
            .request(app)
            .put(`/products/${productId}`)
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
        it('should response an object (message: Product validation failed: price or stock: minimum 0) with status 400. Note: UPDATE PATCH', function(done) {
          const inputProduct = {
            name: 'Trial Product edited',
            description: 'Description edited from PATCH',
            price: -1,
            stock: -1,
          }
          chai
            .request(app)
            .patch(`/products/${productId}`)
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
      })
      describe('AUTHENTICATION', function() {
        describe('PUT', function() {
          it('should response an object (message: no token assigned) with status 400', function(done) {
            const inputProduct = {
              name: 'Trial Product edited',
              description: 'Description edited from PUT',
              price: 1000,
              stock: 100,
            }
            chai
              .request(app)
              .put(`/products/${productId}`)
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
              name: 'Trial Product edited',
              description: 'Description edited from PUT',
              price: 1000,
              stock: 100,
            }
            chai
              .request(app)
              .put(`/products/${productId}`)
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
              name: 'Trial Product edited',
              description: 'Description edited from PUT',
              price: 1000,
              stock: 100,
            }
            chai
              .request(app)
              .put(`/products/${productId}`)
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
        })
        describe('PATCH', function() {
          it('should response an object (message: no token assigned) with status 400', function(done) {
            const inputProduct = {
              name: 'Trial Product edited',
              description: 'Description edited from PATCH',
              price: 1000,
              stock: 100,
            }
            chai
              .request(app)
              .patch(`/products/${productId}`)
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
              name: 'Trial Product edited',
              description: 'Description edited from PATCH',
              price: 1000,
              stock: 100,
            }
            chai
              .request(app)
              .patch(`/products/${productId}`)
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
              name: 'Trial Product edited',
              description: 'Description edited from PATCH',
              price: 1000,
              stock: 100,
            }
            chai
              .request(app)
              .patch(`/products/${productId}`)
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
        })
        describe('DELETE', function() {
          it('should response an object (message: no token assigned) with status 400', function(done) {
            chai
              .request(app)
              .patch(`/products/${productId}`)
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
            chai
              .request(app)
              .delete(`/products/${productId}`)
              .set({ token: tokenNotAllowed })
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
            chai
              .request(app)
              .delete(`/products/${productId}`)
              .set({ token: tokenNotRecognized })
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
        })
      })
      describe('AUTHORIZATION', function() {
        it('should response an object (message: unauthorized to access) with status 401. Note: UPDATE PUT', function(done) {
          const inputProduct = {
            name: 'Trial Product edited',
            description: 'Description edited from PUT',
            price: 1000,
            stock: 100,
          }
          chai
            .request(app)
            .put(`/products/${productId}`)
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
        it('should response an object (message: unauthorized to access) with status 401. Note: UPDATE PATCH', function(done) {
          const inputProduct = {
            description: 'Description edited from PATCH',
            stock: 10,
          }
          chai
            .request(app)
            .patch(`/products/${productId}`)
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
        it('should response an object (message: unauthorized to access) with status 401. Note: DELETE', function(done) {
          chai
            .request(app)
            .patch(`/products/${productId}`)
            .set({ token: tokenUser })
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
      describe('NOT FOUND', function() {
        before(function(done) {
          clearProduct(done);
        })

        it('should response an object (message: data not found) with status 404. Note: UPDATE PUT', function(done) {
          const inputProduct = {
            name: 'Trial Product edited',
            description: 'Description edited from PUT',
            price: 1000,
            stock: 100,
          }
          chai
            .request(app)
            .put(`/products/${productId}`)
            .set({ token })
            .send(inputProduct)
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
        it('should response an object (message: data not found) with status 404. Note: UPDATE PATCH', function(done) {
          const inputProduct = {
            description: 'Description edited from PATCH',
            stock: 10,
          }
          chai
            .request(app)
            .patch(`/products/${productId}`)
            .set({ token })
            .send(inputProduct)
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
        it('should response an object (message: data not found) with status 404. Note: DELETE', function(done) {
          chai
            .request(app)
            .patch(`/products/${productId}`)
            .set({ token })
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
})
