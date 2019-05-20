const chai = require("chai");
const chaiHttp = require("chai-http");
const User = require("../models/user");
const clearUser = require("../helpers/clear-user-helper");
const app = require("../app");
const expect = chai.expect;

chai.use(chaiHttp);

before(function(done) {
  clearUser(done);
});

// after(function(done) {
//   clearTodo(done);
// });

describe("Users", function() {
  describe("POST /register", function() {
    it("should return status code 201 with response body created user", function(done) {
      const userData = {
        email: "test@mail.com",
        fullName: "Test Aja",
        password: "password",
      };

      chai.request(app)
        .post("/api/register")
        .send(userData)
        .end(function(err, res) {
          // console.log(err);
          // console.log(res.body);
          
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");

          expect(res.body).have.property("id");
          expect(res.body).have.property("email");
          expect(res.body).have.property("fullName");
          expect(res.body).have.property("displayPicture");
          expect(res.body).have.property("token");

          expect(res.body.email).to.be.equal("test@mail.com");
          expect(res.body.fullName).to.be.equal("Test Aja");

          done();
        });
    });

    it("should return status code 400 with error message", function(done) {
      const userData = {
        email: "test@mail.com",
        fullName: "Test Aja",
        password: "password",
      };

      chai.request(app)
        .post("/api/register")
        .send(userData)
        .end(function(err, res) {
          // console.log(err);
          // console.log(res.body.message);

          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.be.equal("User validation failed: email: Email test@mail.com has been taken already.")

          done();
        });
    });

    it("should return status code 400 with message 'Email is required'", function(done) {
      const userData = {
        fullName: "Hello World",
        password: "password",
      };

      chai.request(app)
        .post("/api/register")
        .send(userData)
        .end(function(err, res) {
          // console.log(err);
          // console.log(res.body.message);

          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.be.equal("User validation failed: email: Email is required");

          done();
        });
    });
  });

  describe("POST /login", function() {
    it("should return status code 200 with user data", function(done) {
      const userData = {
        email: "test@mail.com",
        password: "password",
      };

      chai.request(app)
        .post("/api/login")
        .send(userData)
        .end(function(err, res) {
          // console.log(err);
          // console.log(res.body);

          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");

          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("email");
          expect(res.body).to.have.property("fullName");
          expect(res.body).to.have.property("displayPicture");
          expect(res.body).to.have.property("token");

          expect(res.body.email).to.be.equal("test@mail.com");

          done();
        })
    });

    it("should return status code 400 and error message", function(done) {
      const userData = {
        email: "error@mail.com",
        password: "password",
      };

      chai.request(app)
        .post("/api/login")
        .send(userData)
        .end(function(err, res) {
          // console.log(err);
          // console.log(res.body);

          expect(err).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.be.equal("Wrong username/password");

          done();
        });
    });
  });
});