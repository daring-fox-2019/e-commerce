const chai = require("chai"),
  chaiHttp = require("chai-http"),
  expect = chai.expect,
  app = require("../app"),
  clearProduct = require("../helpers/clearProduct"),
  clearUser = require("../helpers/clearUser");
const { User } = require("../models");
const { generateJWT } = require("../helpers/helper");

chai.use(chaiHttp);

let token = "";
let productId = "";
let cartId = "";

before(function(done) {
  let newUser = new User({
    name: "Fahmi Sutansyah",
    email: "fahmi@mail.com",
    password: "fahmi"
  });
  newUser.save().then(created => {
    let newToken = generateJWT({
      name: created.name,
      email: created.email,
      id: created._id
    });
    token = newToken;
    done();
  });
});

after(function(done) {
  clearProduct(done);
});

describe("Product Test", function() {
  describe("success POST /products", function() {
    it("should return an object of created product with status 201", function(done) {
      chai
        .request(app)
        .post("/products")
        .set("token", token)
        .send({
          title: "Komputer",
          description: "Komputer Paling Anjay",
          price: 12000000,
          stock: 5,
          image:
            "https://store.ais.co.th/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/r/o/rog_phone_packshot_850x850px_2_-02.jpg",
          category: 'technology'
        })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("_id");
          productId = res.body._id;
          expect(res.body).to.have.property("title");
          expect(res.body).to.have.property("image");
          expect(res.body.sellerId).to.be.not.null;
          done();
        });
    });
  });
  describe("error POST /products", function() {
    let newProduct = {
      title: "Ayam",
      description: "Ayam paling anjay",
      price: -1000000,
      image:
        "https://media.gettyimages.com/photos/rooster-in-field-picture-id143415254",
      stock: 4,
      category: 'technology'
    };
    it("should return an error with status", function(done) {
      chai
        .request(app)
        .post("/products")
        .set("token", token)
        .send(newProduct)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res.error.status).to.equal(500);
          expect(res.body.msg).to.equal(
            `Product validation failed: price: Price cannot be below zero!`
          );
          done();
        });
    });
  });
  describe("GET /products", function() {
    it("should return an array of product objects, with status 200", function(done) {
      chai
        .request(app)
        .get("/products")
        .set("token", token)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res.body).to.be.an("array");
          expect(res.body[0]).to.have.property("title");
          done();
        });
    });
  });
  describe("POST /cart", function() {
    it("should return an object of created cart with status 201", function(done) {
      chai
        .request(app)
        .post("/carts")
        .set("token", token)
        .send({
          productId: productId
        })
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          cartId = res.body._id
          expect(res.body).to.have.property("userId");
          expect(res.body).to.have.property("productId");
          expect(res.body.quantity).to.equal(1);
          done();
        });
    });
  });
  describe("DELETE /products/:id", function() {
    it("should return an object of the deleted product, with status 200", function(done) {
      chai
        .request(app)
        .delete(`/products/${productId}`)
        .set("token", token)
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("_id");
          expect(res.body).to.have.property("title");
          expect(res.body).to.have.property("image");
          done();
        });
    });
  });
  describe('error DELETE /cart no id', function(){
    it("should return an error with status 400", function(done){
      chai
        .request(app)
        .delete(`/carts`)
        .set("token", token)
        .end(function(err,res){
          expect(res).to.have.status(400);
          expect(res.body.msg).to.equal('cart id must be provided!')
          done();
        })
    })
  })
  describe('error DELETE /cart id not found', function(){
    it("should return an error with status 400", function(done){
      chai
        .request(app)
        .delete(`/carts?id=5ce1cfbeaf27990305521a`)
        .set("token", token)
        .end(function(err,res){
          expect(res).to.have.status(500);
          done();
        })
    })
  });
  describe('success DELETE /cart', function(){
    it("should return an object with the deleted cart, status 200.", function(done){
      chai
        .request(app)
        .delete(`/carts?id=${cartId}`)
        .set("token", token)
        .end(function(err,res){
          expect(res).to.have.status(200)
          expect(res.body).to.have.property("_id")
          done()
        })
    })
  })
});
