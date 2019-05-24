const   chai        = require('chai')
        chaiHttp    = require('chai-http')
        expect      = chai.expect
        app         = require('../app')

chai.use(chaiHttp)


describe('Product tests', function(){

    // describe('GET /products', function(){
    //     it('should send an array with 200 code',function(done){
    //         chai
    //         .request(app)
    //         .get('/products')
    //         .end(function(err,res){
    //             expect(err).to.be.null;
    //             expect(res).to.have.status(200);
    //             expect(res.body).to.be.an('array');
    //             done()
    //         });
    //     });
    // });

    // describe('GET /products/:id', function(){
    //     it('should send an object with 200 code',function(done){
    //         chai
    //         .request(app)
    //         .get('/products/5cd9374d67629a3c94b08cd2')
    //         .end(function(err,res){
    //             expect(err).to.be.null;
    //             expect(res).to.have.status(200);
    //             expect(res.body).to.be.an('object');
    //             done()
    //         });
    //     });
    // });

    // describe('DELETE /products/:id', function(){
    //     it('should send an object with 200 code',function(done){
    //         chai
    //         .request(app)
    //         .delete('/products/5cd937a4a4e3683cc1770891')
    //         .end(function(err,res){
    //             expect(err).to.be.null;
    //             expect(res).to.have.status(201);
    //             expect(res.body).to.be.an('object');
    //             done()
    //         });
    //     });
    // });

    // describe('POST /products', function() {
    //     it('should send an object of inserted todo with 201 status code', function(done){
    //         const newProduct = {
    //             title: 'baju anak',
    //             description : 'baju anak murah umur 3 tahun',
    //             price : 100000,
    //             image : ''
    //         };
    //         chai
    //             .request(app)
    //             .post('/products')
    //             .send(newProduct)
    //             .end(function(err,res){
    //                 expect(err).to.be.null;
    //                 expect(res).to.have.status(201);
    //                 expect(res.body).to.be.an('object');
    //                 expect(res.body).to.have.property('_id');
    //                 expect(res.body).to.have.property('title');
    //                 expect(res.body).to.have.property('description');
    //                 expect(res.body).to.have.property('price');
    //                 expect(res.body).to.have.property('image');
    //                 expect(res.body.title).to.equal(newProduct.title);
    //                 expect(res.body.description).to.equal(newProduct.description);
    //                 expect(res.body.price).to.equal(newProduct.price);
    //                 expect(res.body.image).to.equal(newProduct.image);
    //                 done()
    //             })
    //         })
    //     })

        // describe('PATCH /products/:id', function() {
        //     it('should send an object of updated todo with 201 status code', function(done){
        //         const newProduct = {
        //             title: 'baju saya',
        //             description : 'baju anak murah umur 3 tahun',
        //             price : 50000,
        //             image : ''
        //         };
        //         chai
        //             .request(app)
        //             .patch('/products/5cd93d01ce40e541ace897f0')
        //             .send(newProduct)
        //             .end(function(err,res){
        //                 expect(err).to.be.null;
        //                 expect(res).to.have.status(201);
        //                 expect(res.body).to.be.an('object');
        //                 expect(res.body).to.have.property('_id');
        //                 expect(res.body).to.have.property('title');
        //                 expect(res.body).to.have.property('description');
        //                 expect(res.body).to.have.property('price');
        //                 expect(res.body).to.have.property('image');
        //                 expect(res.body.title).to.equal(newProduct.title);
        //                 expect(res.body.description).to.equal(newProduct.description);
        //                 expect(res.body.created_at).to.equal(newProduct.created_at);
        //                 expect(res.body.price).to.equal(newProduct.price);
        //                 expect(res.body.image).to.equal(newProduct.image);
        //                 done()
        //             })
        //         })
        //     })

        // describe('POST /carts',function(){
        //     it('should send an object of inserted cart with 200 status code',function(done){
        //         const newCart = {
        //             products : []
        //         };
        //         chai
        //             .request(app)
        //             .post('/carts')
        //             .send(newCart)
        //             .end(function(err,res){
        //                 expect(err).to.be.null;
        //                 expect(res).to.have.status(200);
        //                 expect(res.body).to.be.an('object');
        //                 expect(res.body).to.have.property('_id');
        //                 expect(res.body).to.have.property('products');
        //                 done();
        //             })
        //     })
        // })

        describe('DELETE /carts/id',function(){
            it('should send an object of deleted cart with 201 status code',function(done){
                chai
                    .request(app)
                    .delete('/carts/5cd99d5d58dcdc72f47f7452')
                    .end(function(err,res){
                        expect(err).to.be.null;
                        expect(res).to.have.status(201);
                        expect(res.body).to.be.an('object');
                        done();
                    })
            })
        })


    })


