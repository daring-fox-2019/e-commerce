var chai = require('chai')
  , chaiHttp = require('chai-http')
  , expect = chai.expect
chai.use(chaiHttp);
const app = require('../app')
const User = require('../models/user')
// var agent = chai.request.agent(app)
const jwt = require('jsonwebtoken')
let token
let id = ""

describe("routes /products",function(){
  this.timeout(3000);
  before((done)=>{
    User.findOne({ email: "admin@mail.com" })
    .then(row =>{
      let payload = {
        _id: row._id,
        email: row.email,
        password: row.password,
      }
      token = jwt.sign(payload, process.env.KUNCI)
      // console.log(token, 'token');
      done()
    })
    .catch(err =>{
      // console.log(err, 'err');
      done(err)
    })
  })
  it('create product berhasil (Admin only) /create', function(done) {
    let reqBody = {
      name: "Kapak",
      category: 'Perkakas',
      price: 50000,
      stock: 68,
    }
    chai.request(app)
    .post('/products/create')
    .set('token', token)
    .send(reqBody)
    .end(function(err, res) {
      id = res.body._id
      expect(err).to.be.null;
      expect(res).to.have.status(201);
      done();
    });
  });
  it('baca semua products berhasil /read', function(done) {
    chai.request(app)
    .get('/products/read')
    .set('token', token)
    .end(function(err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      done();
    });
  });
  it('baca satu product dari id berhasil /read/:id', function(done) {
    chai.request(app)
    .get(`/products/read/${id}`)
    .set('token', token)
    .end(function(err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      done();
    });
  });
  it('search products berhasil /read/search', function(done) {
    let query = "?name=Kapak"
    chai.request(app)
    .get(`/products/read/search${query}`)
    .set('token', token)
    .end(function(err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      done();
    });
  });
  it('update product berhasil /read/update', function(done) {
    let reqBody = {
      name: "aja",
      category: 'Baju',
      price: 10000,
      stock: 14,
      
    }
    chai.request(app)
    .put(`/products/update/${id}`)
    .set('token', token)
    .send(reqBody)
    .end(function(err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      done();
    });
  });
  it('delete product berhasil /delete/:id', function(done) {
    chai.request(app)
    .delete(`/products/delete/${id}`)
    .set('token', token)
    .end(function(err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      done();
    });
  });
})