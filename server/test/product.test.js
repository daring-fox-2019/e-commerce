// const chai = require('chai')
// const chaiHttp = require('chai-http')
// const expect = chai.expect
// const app = require('../app')
// const clearProduct = require('../helpers/clearProduct')

// chai.use(chaiHttp)

// let productId;

// before(function (done) {
//     const newProduct = {
//         name: "Name",
//         description: "Description",
//         price: 10000,
//         image: "Image"
//     }

//     chai
//         .request(app)
//         .post('/product')
//         .send(newProduct)
//         .end(function(err, res){
//             productId = res.body._id
//             done()
//         })
// })

// after(function (done) {
//     clearProduct(done)
// })

// describe('Product tests', function () {
//     describe('GET /product', function () {
//         it("should send an array of object with status code 200", function (done) {
//             chai
//                 .request(app)
//                 .get('/product')
//                 .end(function (err, res) {
//                     expect(err).to.be.null;
//                     expect(res).to.have.status(200);
//                     expect(res.body).to.be.an('array');
//                     done();
//                 });
//         })
//     })

//     describe("GET /product/:id", function () {
//         it('should send an object according to params id with status code 200', function (done) {
//             chai
//                 .request(app)
//                 .get(`/product/${productId}`)
//                 .end(function (err, res) {
//                     expect(err).to.be.null;
//                     expect(res).to.have.status(200);
//                     expect(res.body).to.have.property('name');
//                     expect(res.body).to.have.property('description');
//                     expect(res.body).to.have.property('image');
//                     expect(res.body).to.have.property('price');
//                     expect(res.body).to.be.an('object');
//                     done();
//                 })
//         })
//     })

//     describe("POST /product", function () {
//         it('should send recently created object with status code 201', function (done) {
//             const newProduct = {
//                 name: "Name",
//                 description: "Description",
//                 price: 10000,
//                 image: "Image",
//                 stock: 10
//             }
//             chai
//                 .request(app)
//                 .post('/product')
//                 .send(newProduct)
//                 .end(function (err, res) {
//                     expect(err).to.be.null;
//                     expect(res).to.have.status(201);
//                     expect(res.body).to.have.property('name');
//                     expect(res.body).to.have.property('description');
//                     expect(res.body).to.have.property('image');
//                     expect(res.body).to.have.property('price');
//                     expect(res.body).to.have.property('stock');
//                     expect(res.body.price).to.be.a("number");
//                     expect(res.body.stock).to.be.a("number");
//                     expect(res.body.title).to.equal(newProduct.title);
//                     expect(res.body.description).to.equal(newProduct.description);
//                     expect(res.body).to.be.an('object');
//                     done();
//                 })
//         })
//     })

//     describe("DELETE /product/:id", function () {
//         it("Should send object of deleted object with status code 200", function (done) {
//             chai
//                 .request(app)
//                 .delete(`/product/${productId}`)
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(200)
//                     expect(res.body).to.be.an("object")
//                     done()
//                 })
//         })
//     })
// })