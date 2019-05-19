var chai = require('chai')
  , expect = chai.expect
var agent
var id
var token
describe("routes /products",function(){
  before((done)=>{
    var exported = require('./user.test')
    agent = exported.agent
    id = exported.id
    token = exported.token
    done()
  })
  it('create product berhasil (Admin only) /create', function(done) {
    let reqBody = {
      name: "boleh",
      image_url: "boleh",
      price: 5000,
      stock: 6,
    }
    agent
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
    agent
    .get('/products/read')
    .set('token', token)
    .end(function(err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      done();
    });
  });
  it('baca satu product dari id berhasil /read/:id', function(done) {
    agent
    .get(`/products/read/${id}`)
    .set('token', token)
    .end(function(err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      done();
    });
  });
  it('search products berhasil /read/search', function(done) {
    let query = "?name=boleh"
    agent
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
      image_url: "aja",
      price: 10000,
      stock: 14,
    }
    agent
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
    agent
    .delete(`/products/delete/${id}`)
    .set('token', token)
    .end(function(err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      done();
    });
  });
})