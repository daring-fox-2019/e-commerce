const chai = require('chai'),
      chaiHttp = require('chai-http'),
      expect = chai.expect,
      app = require("../app"),
      clearUser = require('../helpers/clearUser')
chai.use(chaiHttp)

after(function(done){
  clearUser(done)
})

describe("User Test", function(){
  describe("POST /users", function(){
    it("should return an object of the created user with status code 201", function(done){
      chai
        .request(app)
        .post("/users")
        .send({
          name : "Bam Sutansyah",
          email: "bambang@mail.com",
          password : "fahmi"
        })
        .end(function(err,res){
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an("object")
          expect(res.body).to.have.property('_id')
          expect(res.body).to.have.property("name")
          expect(res.body).to.have.property('email')
          expect(res.body).to.have.property('password')
          expect(res.body.name).to.equal("Bam Sutansyah")
          done()
        })
    })
  })
  describe("POST /users/login", function(){
    it("should return an object with token key, status code 200", function(done){
      chai
        .request(app)
        .post('/users/login')
        .send({
          email: "bambang@mail.com",
          password: "fahmi"
        })
        .end(function(err,res){
          expect(err).to.be.null
          expect(res.body).to.be.an("object")
          expect(res.body.token).to.be.an("string")
          done()
        })
    })
    it("should return an object of error message with status code 400", function(done){
      chai 
        .request(app)
        .post("/users/login")
        .send({
          email : "bambang@mail.com",
          password : "bambang"
        })
        .end(function(err,res){
          expect(err).to.be.null
          expect(res.error.status).to.equal(400)
          expect(res.body.msg).to.equal("Invalid email/password")
          done()
        })
    })
    it("should return an object of error msg of invalid email/password with status code 400", function(done){
      chai
        .request(app)
        .post("/users/login")
        .send({
          email : "bag@mail.com",
          password : "fahmi "
        })
        .end(function(err,res){
          expect(err).to.be.null
          expect(res.error.status).to.equal(400)
          expect(res.body.msg).to.equal("Invalid email/password")
          done()
        })
    })
  })

})
