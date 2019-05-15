const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const modelUser = require('../models/user')
const modelProduct = require('../models/product')
const modelCart = require('../models/cart')
const clearTransaction = require('../helpers/clearTransaction')
const { compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')

chai.should()
chai.use(chaiHttp);

let token = null
let cartId = null
let product = null
let userId = null
let transactionId = null

before(function (done) {
  clearTransaction(done)
});

let user = {
  name: 'prasetio',
  email: 'prasetio@gmail.com',
  password: '123'
}
before(function (done) {
  modelUser.create(user)
    .then(data => {
      return modelUser.findOne({ email: user.email })
    })
    .then(userFound => {
      if (userFound) {
        if (compare(user.password, userFound.password)) {
          token = sign({ _id: userFound._id, name: userFound.name, email: userFound.email })
          userId = userFound._id
        }
      }
      done()
    })
});

let newProduct = {
  name: 'Bugati Veron',
  price: 5000,
  stock: 30,
  image: 'https://storage.googleapis.com/image-ecommerce/1557751187614mobil.jpg',
  userId: userId
}
before(function (done) {
  modelProduct.create(newProduct)
    .then(data => {
      product = data._id
      done()
    })
});

before(function (done) {
  modelCart.create({ productId: product, quantity: 3 })
    .then(data => {
      cartId = data._id
      done()
    })
});

describe('Transaction', function () {
  describe('POST /', function () {
    it('should send a new object of transaction', function (done) {
      let newTransaction = {
        cart: [cartId],
        totalPrice: 5000000,
      }
      chai
        .request(app)
        .post('/transaction')
        .send(newTransaction)
        .set('token', token)
        .end(function (err, res) {
          res.should.to.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.userId.should.be.a('string');
          res.body.should.have.property('userId');
          res.body.userId.should.be.a('string');
          res.body.should.have.property('cart');
          res.body.cart.should.be.a('array');
          res.body.should.have.property('totalPrice');
          res.body.totalPrice.should.be.a('number');
          res.body.should.have.property('status');
          res.body.status.should.be.a('boolean');
          transactionId = res.body._id

          done();
        })
    })
  })

  describe('GET /', function () {
    it('should send a object of transaction', function (done) {
      chai
        .request(app)
        .get('/transaction')
        .send({status: true})
        .set('token', token)
        .end(function (err, res) {
          res.should.to.have.status(200);
          res.body.should.be.a('array');
          res.body[0].should.have.property('_id');
          res.body[0].userId.should.be.a('string');
          res.body[0].should.have.property('userId');
          res.body[0].userId.should.be.a('string');
          res.body[0].should.have.property('cart');
          res.body[0].cart.should.be.a('array');
          res.body[0].should.have.property('totalPrice');
          res.body[0].totalPrice.should.be.a('number');
          res.body[0].should.have.property('status');
          res.body[0].status.should.be.a('boolean');

          done();
        })
    })
  })

  describe('PATCH /:id', function () {
    it('should send a object of transaction with status true', function (done) {
      chai
        .request(app)
        .patch(`/transaction/${transactionId}`)
        .set('token', token)
        .end(function (err, res) {
          res.should.to.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.userId.should.be.a('string');
          res.body.should.have.property('status');
          res.body.status.should.be.a('boolean');
          res.body.status.should.be.equal(true);

          done();
        })
    })
  })

  describe('DELETE /:id', function () {
    it('should send object with id transaction that has been deleted', function (done) {
      chai
        .request(app)
        .delete(`/transaction/${transactionId}`)
        .set('token', token)
        .end(function (err, res) {
          res.should.to.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.userId.should.be.a('string');

          done();
        })
    })
  })
})