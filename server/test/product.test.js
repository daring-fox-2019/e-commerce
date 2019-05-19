const chai      = require('chai'),
      chaiHttp  = require('chai-http'),
      expect    = chai.expect,
      app       = require('../app')
      clearProduct = require('../helpers/clearProduct');

let productId = ''
let category = 'aqiqah'

chai.use(chaiHttp);

before(function(done) {
    clearProduct(done)

    const newProduct = {
        name: 'Initial Data',
        price: 100000,
        stock: 5,
        detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit a, impedit recusandae expedita sunt ratione temporibus, repudiandae tempora distinctio possimus est quibusdam, excepturi molestias quos! Sequi quam laborum aliquam ex.'
    };
    
    chai
        .request(app)
        .post('/products')
        .send(newProduct)
        .end(function(err, res) {
            productId= res.body._id
        });
});

after(function(done) {
    clearProduct(done);
});

describe('Product tests', function() {

    describe('GET /products', function() {
        it('should send an array with 200 status code', function(done) {
        chai
            .request(app)
            .get('/products')
            .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
            });
        });
    });

    describe('GET /products/category?category= ', function() {
        it('should send an array with 200 status code', function(done) {
        chai
            .request(app)
            .get(`/products/category?category=${category}`)
            .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
            });
        });
    });

        
    describe('POST /products', function() {
        it('should send an object of inserted product with 201 status code', function(done) {
            // this.timeout(500);
            const newProduct = {
                name: 'White Album',
                price: 1000000000,
                stock: 2,
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit a, impedit recusandae expedita sunt ratione temporibus, repudiandae tempora distinctio possimus est quibusdam, excepturi molestias quos! Sequi quam laborum aliquam ex.',
                category: 'shirt'
            };
            chai
                .request(app)
                .post('/admin/products')
                .send(newProduct)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('price');
                    expect(res.body).to.have.property('stock');
                    expect(res.body).to.have.property('detail');
                    expect(res.body.name).to.equal(newProduct.name);
                    expect(res.body.price).to.equal(newProduct.price);
                    expect(res.body.stock).to.equal(newProduct.stock);
                    expect(res.body.detail).to.equal(newProduct.description);
                    userId=res.body._id
                    done();
            });

        });
    });

    describe(`PUT /products/:id`, function() {
        it('should send an object of updated product with 201 status code', function(done) {
        const newProduct = {
            name: 'One',
            price: 1000000000,
            stock: 3,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit a, impedit recusandae expedita sunt ratione temporibus, repudiandae tempora distinctio possimus est quibusdam, excepturi molestias quos! Sequi quam laborum aliquam ex.'
        };
        chai
            .request(app)
            .put(`/products/${productId}`)
            .send(newProduct)
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('price');
                expect(res.body).to.have.property('stock');
                expect(res.body).to.have.property('description');
                expect(res.body.name).to.equal(newProduct.name);
                expect(res.body.price).to.equal(newProduct.price);
                expect(res.body.stock).to.equal(newProduct.stock);
                expect(res.body.description).to.equal(newProduct.description);
                done();
            });
        });
    });

    describe('DELETE /products/:id', function() {
        it('should send an object of deleted product with 201 status code', function(done) {

        chai
            .request(app)
            .delete(`/products/${productId}`)
            .send()
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('price');
                expect(res.body).to.have.property('stock');
                expect(res.body).to.have.property('detail');
                expect(res.body._id).to.equal(`${productId}`);
                done();
            });
        });

        it("should failed delete because id", function(done){
            chai
            .request(app)
            .delete(`/products/5cb4c91945915a175607648f`)
            .set({authorization:tokenAdmin})
            .end(function(err,res){
                testFunction.errorTest(err,res,400,"Item id not found")
                done()
            })
        })

        it("failed delete when token is invalid/user not logged in", function(done){
            chai
            .request(app)
            .delete(`/products/5cb4c91945915a175607648f`)
            .set({authorization:"alknfalknfalkfnaleknf"})
            .end(function(err,res){
                testFunction.errorTest(err,res,403,"Token is Invalid")
                done()
            })
        })
    });
});
