// const chai = require('chai')
var chai = require('chai')
  , chaiHttp = require('chai-http')
  , expect = chai.expect
 
chai.use(chaiHttp);
const app = require('../app')
var agent = chai.request.agent(app)
var token = ""
var id = ""
// before('login dulu', function(done){
//   let user = {
//     email: 'alvin@mail.com',
//     password: 'alvin',
//   }
//   chai
//       .request(app)
//       .post('/users/login')
//       .send(user)
//       .end(function(err, res) {
//         expect(err).to.be.null
//         token = res.body.token
//         done()
//       })
// })

describe("App",function(){
  describe("routes /users",function(){
    it('register user /register', function(done) {
      let reqBody = {
        name: "Alvin",
        email: "alvin@mail.com",
        password: "alvin",
      }
      agent
      .post('/users/register')
      .send(reqBody)
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
      });
    });
    it('login user /login', function(done) {
      let reqBody = {
        email: "alvin@mail.com",
        password: "alvin",
      }
      agent
      .post('/users/login')
      .send(reqBody)
      .end(function(err, res) {
        // expect(res).to.have.cookie('sessionid');
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        token = res.body.token
        done();
      });
    });

  describe("routes /products",function(){
    it('create product /create', function(done) {
      let reqBody = {
        title: "boleh",
        content: "boleh",
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
    it('baca semua products /read', function(done) {
      agent
      .get('/products/read')
      .set('token', token)
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
    });
    it('baca satu product dari id /read/:id', function(done) {
      agent
      .get(`/products/read/${id}`)
      .set('token', token)
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
    });
    it('search products /read/search', function(done) {
      let query = "?title=boleh"
      agent
      .get(`/products/read/search${query}`)
      .set('token', token)
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
    });
    it('update product /read/update', function(done) {
      let reqBody = {
        title: "aja",
        content: "aja",
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
    it('delete product /delete/:id', function(done) {
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
  
    // it('register user /register', function(done) {
    //   agent
    //   .post('/users/register')
    //   .end(function(err, res) {
    //     expect(err).to.be.null;
    //     expect(res).to.have.status(201);
    //     done();
    //   });
    // });
  })
})