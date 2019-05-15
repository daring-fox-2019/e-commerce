const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const clearProduct = require('../helpers/clearProduct')
const fs = require('fs')
const modelUser = require('../models/user')
const { hash, compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')

chai.should()
chai.use(chaiHttp)

let productId = null
let token = null

let user = {
  name: 'tiyo',
  email: 'tiyo@gmail.com',
  password: '123'
}
let newProduct = {
  name: 'Bugati Veron',
  price: 5000,
  stock: 30
}

before(function (done) {
  clearProduct(done)
});

before(function (done) {
  modelUser.create(user)
    .then(data => {
      return modelUser.findOne({ email: user.email })
    })
    .then(userFound => {
      if (userFound) {
        if (compare(user.password, userFound.password)) {
          token = sign({ _id: userFound._id, name: userFound.name, email: userFound.email })
        }
      }
      done()
    })
});

describe('Product', function () {
  describe('POST /', function () {
    it('should send a new object product', function (done) {
      
      this.timeout(10000)
      chai
        .request(app)
        .post('/products')
        .attach('image', fs.readFileSync('./test/mobil.jpg'), 'mobil.jpg')
        .field('name', newProduct.name)
        .field('price', newProduct.price)
        .field('stock', newProduct.stock)
        .set('token', token)
        .end(function (err, res) {
          res.should.to.have.status(201);
          productId = res.body._id
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.name.should.be.a('string');
          res.body.name.should.equal(newProduct.name);
          res.body.should.have.property('image');
          res.body.image.should.be.a('string');
          res.body.should.have.property('price');
          res.body.price.should.be.a('number');
          res.body.price.should.equal(newProduct.price);
          res.body.should.have.property('stock');
          res.body.stock.should.be.a('number');
          res.body.stock.should.equal(newProduct.stock);
          done();
        });
    });
  });

  describe('GET / ', function () {
    it('should send a array of object product', function (done) {
      chai
        .request(app)
        .get('/products')
        .end(function (err, res) {
          res.should.to.have.status(200);
          res.body.should.be.a('array');

          for (let i = 0; i < res.body.length; i++) {
            res.body[i].should.have.property('name');
            res.body[i].name.should.be.a('string');
            res.body[i].should.have.property('image');
            res.body[i].image.should.be.a('string');
            res.body[i].should.have.property('price');
            res.body[i].price.should.be.a('number');
            res.body[i].should.have.property('stock');
            res.body[i].stock.should.be.a('number');
          }
          done();
        });
    });
  });

  describe('GET /:id ', function () {
    it('should send a object product', function (done) {
      chai
        .request(app)
        .get(`/products/${productId}`)
        .end(function (err, res) {
          res.should.to.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.name.should.be.a('string');
          res.body.should.have.property('image');
          res.body.image.should.be.a('string');
          res.body.should.have.property('price');
          res.body.price.should.be.a('number');
          res.body.should.have.property('stock');
          res.body.stock.should.be.a('number');
          done();
        });
    });
  });

  describe('PUT /:id ', function () {
    it('should send a new object product after update', function (done) {
      let newData = {
        name: 'roti coklat',
        price: 5000,
        stock: 4
      }
      chai
        .request(app)
        .put(`/products/${productId}`)
        .send(newData)
        .set('token', token)
        .end(function (err, res) {
          res.should.to.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.name.should.be.a('string');
          res.body.name.should.equal(newData.name);
          res.body.should.have.property('price');
          res.body.price.should.be.a('number');
          res.body.price.should.equal(newData.price);
          res.body.should.have.property('stock');
          res.body.stock.should.be.a('number');
          res.body.stock.should.equal(newData.stock);
          done();
        });
    });
  });

  describe('DELETE /:id ', function () {
    it('should send object with id product that has been deleted', function (done) {
      chai
        .request(app)
        .delete(`/products/${productId}`)
        .set('token', token)
        .end(function (err, res) {
          res.should.to.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body._id.should.be.a('string');
          res.body._id.should.equal(productId);
          done();
        });
    });
  });
});
