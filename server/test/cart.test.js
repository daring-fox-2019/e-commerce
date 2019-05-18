const chai = require("chai"),
  chaiHttp = require("chai-http"),
  expect = chai.expect,
  app = require("../app");

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

let shopping = {
  products: ["a","b"],
  amount: 30000,
  status: 20000
}
// Authentication, Authorization, Identity Access Management

// describe("GET /carts", function() {
//   it("when no cart, return []", function(done) {
//     chai
//       .request(app)
//       .get("/carts")
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

// describe("POST /cart", function() {
//   it("when admin input, return {name, price, stock, image}", function(done) {
//     chai
//       .request(app)
//       .post("/cart")
//       .set({ token: admin.token, _id: admin._id })
//       .send(shopping)
//       .end(function(err, res) {
//         expect(err).to.be.null;
//         expect(res.body).to.be.an("object");
//         expect(res).to.have.status(201);
//         done();
//       });
//   });
// });

// describe("POST /carts", function() {
//     it("when user input, return {message}", function(done) {
//       chai
//         .request(app)
//         .post("/cart")
//         .set({ token: user.token, _id: user._id })
//         .send(shopping)
//         .end(function(err, res) {
//           expect(err).to.be.null;
//           expect(res.body).to.be.an("object");
//           expect(res.body).to.have.property('message')
//           expect(res).to.have.status(403);
//           done();
//         });
//     });
//   });

// describe("GET /carts", function() {
//   it("when theres cart, return [{},{}]", function(done) {
//     chai
//       .request(app)
//       .get("/carts?status=checkedout")
//       .set({ token: user.token, _id: user._id })
//       .end(function(err, res) {
//         expect(err).to.be.null;
//         expect(res.body).to.be.an("array");
//         expect(res).to.have.status(200);
//         done();
//       });
//   });
// });


// describe("GET /cart/5ce03c784426e221678422af", function() {
//   it("when theres cart, return { }", function(done) {
//     chai
//       .request(app)
//       .get("/cart/5ce03c784426e221678422af")
//       .set({ token: user.token, _id: user._id })
//       .end(function(err, res) {
//           console.log(res.body)
//         expect(err).to.be.null;
//         expect(res.body).to.be.an("object");
//         expect(res.body).to.have.property("_id");
//         expect(res.body).to.have.property("items");
//         expect(res.body).to.have.property("amout");
//         expect(res.body).to.have.property("status");
//         expect(res).to.have.status(200);
//         done();
//       });
//   });
// });

// describe("DELETE /cart/5ce03c784426e221678422af", function() {
//   it("when user delete existing cart, return {message} 403", function(done) {
//     chai
//       .request(app)
//       .delete("/cart/5ce03c784426e221678422af")
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


// describe("DELETE /cart/5ce03c784426e221678422af", function() {
//     it("when admin delete existing cart, _id 200", function(done) {
//       chai
//         .request(app)
//         .delete("/cart/5ce03c784426e221678422af")
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


//   describe("PUT /cart/5ce04580a3ce492dbceab2b6", function() {
//     it("when admin/user trigger something that update existing cart, {last object} 200", function(done) {
//       chai
//         .request(app)
//         .put("/cart/5ce04580a3ce492dbceab2b6")
//         .set({ token: admin.token, _id: admin._id })
//         .send({ cart: ["80","b"] })
//         .end(function(err, res) {
//             console.log(res.body)
//           expect(err).to.be.null;
//           expect(res.body).to.have.property("_id");
//           expect(res).to.have.status(200;
//           done();
//         });
//     });
//   });
