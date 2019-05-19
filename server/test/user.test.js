const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const clearUser = require('../helpers/clearUser')

chai.use(chaiHttp)

before(function (done) {
    const newUser = {
        name: "name",
        email: "email",
        password: "password"
    }

    chai
        .request(app)
        .post('/user/register')
        .send(newUser)
        .end(function (err, res) {
            userId = res.body._id
            done()
        })
})

after(function (done) {
    clearUser(done)
})

describe('User tests', function () {
    describe('GET /users', function () {
        it("should send an array of object with status code 200", function (done) {
            chai
                .request(app)
                .get('/user')
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        })
    })
    describe("POST /user/login", function () {
        it("Should send a token generated from payload of logged in user", function (done) {
            const input = { email: "email", password: "password" }
            chai
                .request(app)
                .post("/user/login")
                .send(input)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    done()
                })
        })
    })
    describe("POST /user/register", function () {
        it("Should send an object of recentlyy registered user", function (done) {
            const input = { name: "name", email: "email", password: "password" }
            chai
                .request(app)
                .post('/user/register')
                .send(input)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an("object")
                    expect(res.body).to.have.property("name")
                    expect(res.body).to.have.property("email")
                    expect(res.body).to.have.property("password")
                    expect(res.body.name).to.equal(input.name)
                    expect(res.body.email).to.equal(input.email)
                    expect(res.body.password).to.not.equal(input.password)
                    done()
                })
        })
    })
})