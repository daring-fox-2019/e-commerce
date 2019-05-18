const chai = require("chai"),
  chaiHttp = require("chai-http"),
  expect = chai.expect,
  app = require("../app"),
  user = require(`../models/user`);

chai.use(chaiHttp);

let userDummy1 = {
  email: "kiki@mail.com",
  password: "12345678"
};

let userDummy1_wrongemail = {
  email: "keke@mail.com",
  password: "12345678"
};

let userDummy1_wrongpass = {
  email: "kiki@mail.com",
  password: "87654321"
};

let userDummy2 = {
  email: "kokomail.com", // email salah
  password: "12345678"
};

let userDummy3 = {
  email: "kiki@mail.com", // password salah
  password: "1234"
};

describe(`POST /register`, function() {
  describe(`Correct Input`, function() {
    it(`should return ${JSON.stringify(
      userDummy1
    )} with status 201`, function() {
      chai
        .request(app)
        .post(`/register`)
        .send(userDummy1)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an(`object`);
          expect(res.body).to.have.property(`token`);
          expect(res.body).to.have.property(`email`);
          expect(res.body).to.have.property(`id`);
        });
    });
  });
  describe(`Wrong Input : email validation`, function() {
    it(`should return { message: "" } with status 400`, function() {
      chai
        .request(app)
        .post(`/register`)
        .send(userDummy2)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an(`object`);
          expect(res.body).to.have.property(`message`);
          expect(res.body.message).to.have.be.an(`string`);
        });
    });
  });
  describe(`Wrong Input : password validation`, function() {
    it(`should return { message: "" } with status 400`, function() {
      chai
        .request(app)
        .post(`/login`)
        .send(userDummy3)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an(`object`);
          expect(res.body).to.have.property(`message`);
          expect(res.body.message).to.have.be.an(`string`);
        });
    });
  });
});

describe(`POST /login`, function() {
  describe(`Correct Input`, function() {
    it(`should return { token, email, id }`, function() {
      chai
        .request(app)
        .post(`/login`)
        .send(userDummy1)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an(`object`);
          expect(res.body).to.have.property(`token`);
          expect(res.body).to.have.property(`email`);
          expect(res.body).to.have.property(`id`);
        });
    });
  });
  describe(`Wrong Email`, function() {
    it(`should return { message: "" } with status 400`, function() {
      chai
        .request(app)
        .post(`/login`)
        .send(userDummy1_wrongemail)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an(`object`);
          expect(res.body).to.have.property(`message`);
          expect(res.body.message).to.have.be.an(`string`);
        });
    });
  });
  describe(`Wrong Password`, function() {
    it(`should return { message: "" } with status 400`, function() {
      chai
        .request(app)
        .post(`/login`)
        .send(userDummy1_wrongpass)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an(`object`);
          expect(res.body).to.have.property(`message`);
          expect(res.body.message).to.have.be.an(`string`);
        });
    });
  });
});
