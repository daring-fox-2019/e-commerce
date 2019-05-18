const chai = require("chai"),
  chaiHttp = require("chai-http"),
  expect = chai.expect,
  app = require("../app");
//   user = require(`../models/user`);

chai.use(chaiHttp);

let admin = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZTAyZDE2YmMwZjMzMDMwYWE3NTQ3ZSIsImVtYWlsIjoiYWRtaW5AbXlvcy5jb20iLCJpYXQiOjE1NTgxOTgxMDV9.SYAzUYYPDDh3Wvhqv6kQHIkFmhUDahaaLlTY3hGHuco",
  _id: "5ce02d16bc0f33030aa7547e",
  email: "admin@myos.com"
};

let user = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZTAyYjBlYWNmNjQxN2VlNTdiMzI5ZiIsImVtYWlsIjoia2lraUBtYWlsLmNvbSIsImlhdCI6MTU1ODE5ODA3Mn0.kVboJBfjFxq33U4ZFX9UFt9pvQtveD0Y0KmD_dHkTk8",
  _id: "5ce02b0eacf6417ee57b329f",
  email: "kiki@mail.com"
};

// Authentication, Authorization, Identity Access Management

// describe("GET /products", function() {
//   it("when no product, return []", function(done) {
//     chai
//       .request(app)
//       .get("/products")
//       .set({ token: user.token, _id: user._id })
//       .end(function(err, res) {
//         console.log(res.body)
//         expect(err).to.be.null;
//         expect(res.body).to.be.an("array");
//         expect(res).to.have.status(200);
//         done();
//       });
//   });
// });

// describe("POST /product", function() {
//   it("when admin input, return {name, price, stock, image}", function(done) {
//     chai
//       .request(app)
//       .post("/product")
//       .set({ token: admin.token, _id: admin._id })
//       .send({ name: "String", image: "String", price: 909090, stock: 90 })
//       .end(function(err, res) {
//         expect(err).to.be.null;
//         expect(res.body).to.be.an("object");
//         expect(res).to.have.status(201);
//         done();
//       });
//   });
// });

// describe("POST /products", function() {
//     it("when user input, return {message}", function(done) {
//       chai
//         .request(app)
//         .post("/product")
//         .set({ token: user.token, _id: user._id })
//         .send({name : "baju", price: 200000, stock: 90, image:"url"})
//         .end(function(err, res) {
//           expect(err).to.be.null;
//           expect(res.body).to.be.an("object");
//           expect(res.body).to.have.property('message')
//           expect(res).to.have.status(403);
//           done();
//         });
//     });
//   });

// describe("GET /products", function() {
//   it("when theres product, return [{},{}]", function(done) {
//     chai
//       .request(app)
//       .get("/products?status=ready")
//       .set({ token: user.token, _id: user._id })
//       .end(function(err, res) {
//         expect(err).to.be.null;
//         expect(res.body).to.be.an("array");
//         expect(res).to.have.status(200);
//         done();
//       });
//   });
// });


// describe("GET /product/5ce03c784426e221678422af", function() {
//   it("when theres product, return { }", function(done) {
//     chai
//       .request(app)
//       .get("/product/5ce03c784426e221678422af")
//       .set({ token: user.token, _id: user._id })
//       .end(function(err, res) {
//           console.log(res.body)
//         expect(err).to.be.null;
//         expect(res.body).to.be.an("object");
//         expect(res.body).to.have.property("_id");
//         expect(res.body).to.have.property("name");
//         expect(res.body).to.have.property("image");
//         expect(res.body).to.have.property("stock");
//         expect(res.body).to.have.property("price");
//         expect(res).to.have.status(200);
//         done();
//       });
//   });
// });

// describe("DELETE /product/5ce03c784426e221678422af", function() {
//   it("when user delete existing product, return {message} 403", function(done) {
//     chai
//       .request(app)
//       .delete("/product/5ce03c784426e221678422af")
//       .set({ token: user.token, _id: user._id })
//       .end(function(err, res) {
//           console.log(res.body)
//         expect(err).to.be.null;
//         expect(res.body).to.be.an('object')
//         expect(res.body).to.have.property("message");
//         expect(res).to.have.status(403);
//         done();
//       });
//   });
// });


// describe("DELETE /product/5ce03c784426e221678422af", function() {
//     it("when admin delete existing product, _id 200", function(done) {
//       chai
//         .request(app)
//         .delete("/product/5ce03c784426e221678422af")
//         .set({ token: admin.token, _id: admin._id })
//         .end(function(err, res) {
//             console.log(res.body)
//           expect(err).to.be.null;
//           expect(res.body).to.have.property("_id");
//           expect(res).to.have.status(200);
//           done();
//         });
//     });
//   });


//   describe("PUT /product/5ce04580a3ce492dbceab2b6", function() {
//     it("when admin/user trigger something that update existing product, {last object} 200", function(done) {
//       chai
//         .request(app)
//         .put("/product/5ce04580a3ce492dbceab2b6")
//         .set({ token: admin.token, _id: admin._id })
//         .send({ stock: 80 })
//         .end(function(err, res) {
//             console.log(res.body)
//           expect(err).to.be.null;
//           expect(res.body).to.have.property("_id");
//           expect(res).to.have.status(200;
//           done();
//         });
//     });
//   });
