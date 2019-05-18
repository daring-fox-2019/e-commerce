const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const modelUser = require('../models/user')
const modelProduct = require('../models/product')
const { compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')

chai.should()
chai.use(chaiHttp);

let token = null
let cartId = null
let product = null
let userId = null

let user = {
  name: 'pras',
  email: 'pras@gmail.com',
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




describe('Cart', function () {
  describe('POST / ', function () {
    it('should send a new object cart', function (done) {
      let newCart = {
        productId: product,
        quantity: 3,
      }      
      chai
        .request(app)
        .post('/cart')
        .set('token', token)
        .send(newCart)
        .end(function (err, res) {
          res.should.to.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.userId.should.be.a('string');
          res.body.should.have.property('userId');
          res.body.userId.should.be.a('string');
          res.body.should.have.property('productId');
          res.body.productId.should.be.a('string');
          res.body.should.have.property('quantity');
          res.body.quantity.should.be.a('number');
          res.body.should.have.property('status');
          res.body.status.should.be.a('boolean');
          cartId = res.body._id

          done();
        });
    });
  })

  describe('GET', function () {
    it('should send a object cart', function (done) {
      chai
        .request(app)
        .get(`/cart`)
        .set('token', token)
        .end(function (err, res) {
          res.should.to.have.status(200);
          res.body.should.be.a('array');
          res.body[0].should.have.property('_id');
          res.body[0]._id.should.be.a('string');
          res.body[0].should.have.property('userId');
          res.body[0].userId.should.be.an('object');
          res.body[0].should.have.property('productId');
          res.body[0].productId.should.be.an('object');
          res.body[0].should.have.property('quantity');
          res.body[0].quantity.should.be.a('number');
          res.body[0].should.have.property('status');
          res.body[0].status.should.be.a('boolean');
          done();
        });
    });
  });

  describe('PUT /:id ', function () {
    it('should send a new object cart', function (done) {
      let updateCart = {
        productId: product,
        quantity: 5,
      }
      chai
        .request(app)
        .put(`/cart/${cartId}`)
        .set('token', token)
        .send(updateCart)
        .end(function (err, res) {
          res.should.to.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.userId.should.be.a('string');
          res.body.should.have.property('userId');
          res.body.userId.should.be.a('string');
          res.body.should.have.property('productId');
          res.body.productId.should.be.a('string');
          res.body.should.have.property('quantity');
          res.body.quantity.should.be.a('number');
          res.body.should.have.property('status');
          res.body.status.should.be.a('boolean');
          done();
        });
    });
  });

  describe('DELETE /:id ', function () {
    it('should send object with id cart that has been deleted ', function (done) {
      chai
        .request(app)
        .delete(`/cart/${cartId}`)
        .set('token', token)
        .end(function (err, res) {
          res.should.to.have.status(200);
          res.body.should.have.property('_id');
          res.body.userId.should.be.a('string');
          done();
        });
    });
  });


});


