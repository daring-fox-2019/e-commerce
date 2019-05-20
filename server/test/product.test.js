const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const clearProduct = require('../helpers/clearProduct')
const jwt = require('../helpers/jwt')

chai.use(chaiHttp)

let productId;
let userToken;

before(function (done) {
    const newProduct = {
        name: "Name",
        description: "Description",
        price: 10000,
        image: "Image",
        stock: 1,
        category: "Boots"
    }

    chai
        .request(app)
        .post('/product')
        .send(newProduct)
        .end(function (err, res) {
            productId = res.body._id
            console.log(productId);
            
            // done()
        })

    const newUser = {
        name: "name",
        email: "email@mail.com",
        password: "password",
        role: "admin"
    }

    chai
        .request(app)
        .post('/user/register')
        .send(newUser)
        .end(function (err, res) {
            userId = res.body._id
            // done()
        })

    const input = { email: "email@mail.com", password: "password" }
    chai
        .request(app)
        .post("/user/login")
        .send(input)
        .end(function (err, res) {
            console.log(`ini res`);
            console.log(res.body);
            userToken = res.body.token
            done()
        })
})

after(function (done) {
    clearProduct(done)
})

describe('Product tests', function () {
    // Errors for not being authenticated, not providing token
    describe('GET /product', function () {
        it("should send error for not being authenticated with status 500", function (done) {
            chai
                .request(app)
                .get('/product')
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(500);
                    done();
                });
        })
    })

    describe("GET /product/:id", function () {
        it('should send error for not being authenticated with status 500', function (done) {
            chai
                .request(app)
                .get(`/product/${productId}`)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(500);
                    done();
                })
        })
    })

    describe("POST /product", function () {
        it('should send error for not being authenticated with status 500', function (done) {
            const newProduct = {
                name: "Name",
                description: "Description",
                price: 10000,
                image: "Image",
                stock: 10
            }
            chai
                .request(app)
                .post('/product')
                .send(newProduct)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(500);
                    done();
                })
        })
    })

    describe("DELETE /product/:id", function () {
        it("should send error for not being authenticated with status 500", function (done) {
            chai
                .request(app)
                .delete(`/product/${productId}`)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    done()
                })
        })
    })





    describe('GET /product', function () {
        it("should send an array of object with status code 200", function (done) {
            chai
                .request(app)
                .get('/product')
                .set('token', userToken)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        })
    })

    // describe("GET /product/:id", function () {
    //     console.log('ini productid');
    //     console.log(productId);
    //     console.log('ini productid');
        
    //     it('should send an object according to params id with status code 200', function (done) {
    //         chai
    //             .request(app)
    //             .get(`/product/${productId}`)
    //             .set('token', userToken)
    //             .end(function (err, res) {
    //                 expect(err).to.be.null;
    //                 expect(res).to.have.status(200);
    //                 // expect(res.body).to.have.property('name');
    //                 // expect(res.body).to.have.property('description');
    //                 // expect(res.body).to.have.property('image');
    //                 // expect(res.body).to.have.property('price');
    //                 expect(res.body).to.be.an('object');
    //                 done();
    //             })
    //     })
    // })

    // Create product must be admin
    describe("POST /product", function () {
        it('Should send an error for being unauthorized, not an admin with status error 403', function (done) {
            const newProduct = {
                name: "Name",
                description: "Description",
                price: 10000,
                image: "Image",
                stock: 10
            }
            chai
                .request(app)
                .post('/product')
                .send(newProduct)
                .set('token', userToken)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403);
                    done();
                })
        })
    })

    // describe("POST /product", function () {
    //     it('should send recently created object with status code 201', function (done) {
    //         const newProduct = {
    //             name: "Name",
    //             description: "Description",
    //             price: 10000,
    //             image: "Image",
    //             stock: 10
    //         }
    //         chai
    //             .request(app)
    //             .post('/product')
    //             .send(newProduct)
    //             .set('token', userToken)
    //             .end(function (err, res) {
    //                 expect(err).to.be.null;
    //                 expect(res).to.have.status(201);
    //                 expect(res.body).to.have.property('name');
    //                 expect(res.body).to.have.property('description');
    //                 expect(res.body).to.have.property('image');
    //                 expect(res.body).to.have.property('price');
    //                 expect(res.body).to.have.property('stock');
    //                 expect(res.body.price).to.be.a("number");
    //                 expect(res.body.stock).to.be.a("number");
    //                 expect(res.body.title).to.equal(newProduct.title);
    //                 expect(res.body.description).to.equal(newProduct.description);
    //                 expect(res.body).to.be.an('object');
    //                 done();
    //             })
    //     })
    // })

    // delete product must be admin
    describe("DELETE /product/:id", function () {
        it("Should send an error for being unauthorized with status error 403", function (done) {
            chai
                .request(app)
                .delete(`/product/${productId}`)
                .set('token', userToken)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(403)
                    done()
                })
        })
    })
})