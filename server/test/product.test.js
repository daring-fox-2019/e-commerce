const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
let ProductId = ''
let token = ''
let unauthorizedToken = ''

const User = require('../models/user-model')
const Product = require('../models/product-model')
const { sign } = require('../helpers/jwt')

chai.use(chaiHttp);

before(function(done) {
    
    User
        .create({
            firstName : 'Martin',
            lastName : 'Suhendra',
            gender: 'male',
            email : 'martin@mail.com',
            password : '12345',
            role : 'admin'
        })
        .then((newUser) => {
            
            let { _id, firstName, lastName,gender, email, role } = newUser
            let payload = { _id, firstName, lastName, gender, email, role }
            token = sign(payload)
           
        })
        .catch(err => {
            console.log(err);
            done()
        })
    
    User
    .create({
        firstName : 'Reyhan',
        lastName : 'Huditama',
        gender: 'male',
        email : 'rey@mail.com',
        password : '12345',
        role : 'customer'
    })
    .then((newUser) => {
        
        let { _id, firstName, lastName,gender, email, role } = newUser
        let payload = { _id, firstName, lastName, gender, email, role }
        unauthorizedToken = sign(payload)
        done()
    })
    .catch(err => {
        console.log(err);
        done()
    })
})

after(function(done) {
    User
    .deleteMany({})
    .then(() => {})
    .catch((err)=> { done()
        console.log(err);
    })

    Product
    .deleteMany({})
    .then(() => { done()
    })
    .catch((err)=> {
        console.log(err);
    })
})

describe('Product tests', function() {

    describe('POST /products', function() {
        describe('success parameter value', function() {
            let newProduct = {
                productName : 'Guitar',
                description : 'Fender Mustang',
                price : 2000,
                stock : 12,
                image : 'image.jpg'
            }

            it('should send an object with status code 201', function(done) {
                chai
                    .request(app)
                    .post('/products')
                    .send( newProduct )
                    .set('token', token)
                    .end(function(err, res) {
                        
                        expect(err).to.be.null;
                        expect(res).to.have.status(201);
                        expect(res.body).to.be.an('object');
                        expect(newProduct).to.have.property('productName')
                        expect(newProduct).to.have.property('description')
                        expect(newProduct).to.have.property('price')
                        expect(newProduct).to.have.property('stock')
                        expect(newProduct).to.have.property('image')
                        ProductId = res.body._id
                        done()
                    })
            })

            //Input without description
            it('should send an object with status code 201', function(done) {

                chai
                    .request(app)
                    .post('/products')
                    .send({  productName : 'Guitar',
                            description : '',
                            price : 2000,
                            stock : 12,
                            image : 'image.jpg'})
                    .set('token', token)
                    .end(function(err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(201);
                        expect(res.body).to.be.an('object');
                        expect(newProduct).to.have.property('productName')
                        expect(newProduct).to.have.property('price')
                        expect(newProduct).to.have.property('stock')
                        expect(newProduct).to.have.property('image')
                        ProductId = res.body._id
                        done()
                    })
            })
        })

        describe('error parameter value', function() {
            
            //Not Authenticated User
            it('should return status code 401 with object (ERROR: You do not have access to this page!) ', function(done) {
                chai
                    .request(app)
                    .post('/products')
                    .send({
                        productName : 'Guitar',
                        description : 'Fender Mustang',
                        price : 2000,
                        stock : 12,
                        image : 'image.jpg'
                    })
                    .end(function(err, res) {
                        let { message } = res.body
                        expect( message ).equal('You do not have access to this page!')
                        done()
                    })
            })
            //Product Name Empty
            it('should return status code 500 with object (ERROR: Product must have a name) ', function(done) {
                chai
                    .request(app)
                    .post('/products')
                    .send({
                        productName : '',
                        description : 'Fender Mustang',
                        price : 2000,
                        stock : 12,
                        image : 'image.jpg'
                    })
                    .set('token', token)
                    .end(function(err, res) {
                        const { message } = res.body.errors.productName
                        expect(res).to.have.status(500)
                        expect(res).to.be.an('object')
                        expect(message).to.include('Product must have a name')
                        done()
                    })
            })

            //Product Price is Empty
            it('should return status code 500 with object (ERROR: Price should greater than equal 0 )', function(done) {
                chai
                .request(app)
                .post('/products')
                .send({
                    productName : 'Guitar',
                    description : 'Fender Mustang',
                    price : '',
                    stock : 12,
                    image : 'image.jpg'
                })
                .set('token', token)
                .end(function(err, res) {
                
                    const { message } = res.body.errors.price
                    expect(res).to.have.status(500)
                    expect(res).to.be.an('object')
                    expect(message).to.include('Price should greater than equal 0')
                    done()
                })
            })

             //Product Stock is Empty
            it('should return status code 500 with object (ERROR: Stock is required )', function(done) {
                chai
                .request(app)
                .post('/products')
                .send({
                    productName : 'Guitar',
                    description : 'Fender Mustang',
                    price : 2000,
                    stock : '',
                    image : 'image.jpg'
                })
                .set('token', token)
                .end(function(err, res) {
              
                    const { message } = res.body.errors.stock
                    expect(res).to.have.status(500)
                    expect(res).to.be.an('object')
                    expect(message).to.include('Stock should greater than equal 0')
                    done()
                })
            })

                //Product price is less than 0
                it('should return status code 500 with object (ERROR: Price should greater than equal 0 )', function(done) {
                    chai
                    .request(app)
                    .post('/products')
                    .send({
                        productName : 'Guitar',
                        description : 'Fender Mustang',
                        price : -1,
                        stock : 12,
                        image : 'image.jpg'
                    })
                    .set('token', token)
                    .end(function(err, res) {
                    
                        const { message } = res.body.errors.price
                        expect(res).to.have.status(500)
                        expect(res).to.be.an('object')
                        expect(message).to.include('Price should greater than equal 0')
                        done()
                    })
                })

                   //Product stock is less than 0
                it('should return status code 500 with object (ERROR: Stock should greater than equal 0 )', function(done) {
                    chai
                    .request(app)
                    .post('/products')
                    .send({
                        productName : 'Guitar',
                        description : 'Fender Mustang',
                        price : 12,
                        stock : -1,
                        image : 'image.jpg'
                    })
                    .set('token', token)
                    .end(function(err, res) {
                        const { message } = res.body.errors.stock
                        expect(res).to.have.status(500)
                        expect(res).to.be.an('object')
                        expect(message).to.include('Stock should greater than equal 0')
                        done()
                    })
                })
        })

    })

    describe('GET Products', function(){
        //GET ALL PRODUCTS
        describe('success parameter value', function() {
            it('should return status code 200 with array of object products', function(done) {
                chai
                    .request(app)
                    .get('/products')
                    .set('token', token)
                    .end(function(err, res) {
                       
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('array')
                        expect(err).to.be.null
                        done()
                    })
            })
            //GET PRODUCT DETAILS
            it('should return status code 200 object product', function(done) {
                chai
                    .request(app)
                    .get(`/products/${ProductId}`)
                    .set('token', token)
                    .end(function(err, res) {
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('object')
                        expect(err).to.be.null
                        done()
                    })
            })

        })

        describe('error parameter value', function() {
            //NOT AUTHENTICATED
            it('should return status 401 (ERROR : You do not have access to this page! )', function(done) {
                chai
                    .request(app)
                    .get('/products')
                    .end(function(err, res) {
                        expect(res).to.have.status(401)
                        expect(res.body.message).equal('You do not have access to this page!')
                        done()
                    })
            })
            //NOT AUTHORIZED
            it('should return status 401 (ERROR : You do not have access to this page! )', function(done) {
                chai
                    .request(app)
                    .get('/products')
                    .end(function(err, res) {
                        expect(res).to.have.status(401)
                        expect(res.body.message).equal('You do not have access to this page!')
                        done()
                    })
            })
        })
    })

    describe('Update /products', function() {
        describe('success parameter value', function() {
            it('should return 200 with an object of updated data and message Successfully update data', function(done) {

                chai
                    .request(app)
                    .patch(`/products/${ProductId}`)
                    .send({
                        productName : 'Bass',
                        description : 'Fender Jazz Bass',
                        price : 3000,
                        stock : 10,
                        image : 'image1.jpg'
                    })
                    .set('token', token)
                    .end(function(err, res) {
                      
                        expect(res).to.have.status(200)
                        expect(res).is.an('object')
                        expect(res.body).is.an('object')
                        expect(res.body.updated._id).equal(ProductId)
                        expect(res.body.message).equal('Successfully update data')
                        done()
                    })
            })

            //Updating only spesific field
            it('should be return 200 with an object of updated data and message Successfully update data', function(done) {

                chai
                    .request(app)
                    .patch(`/products/${ProductId}`)
                    .send({
                        productName : 'Bass',
                        description : 'Fender Jazz',
                        image : 'image1.jpg'
                    })
                    .set('token', token)
                    .end(function(err, res) {
                        expect(res).to.have.status(200)
                        expect(res).is.an('object')
                        expect(res.body).is.an('object')
                        expect(res.body.updated._id).equal(ProductId)
                        expect(res.body.message).equal('Successfully update data')
                        done()
                    })
            })
        })
        //Not Authenticated
        describe('error parameter value', function() {
            it('should return status 401 with message You do not have access to this page!', function(done) {
                chai
                .request(app)
                .patch(`/products/${ProductId}`)
                .send({
                    productName : 'Bass',
                    description : 'Fender Jazz',
                    image : 'image1.jpg'
                })
                .end(function(err, res) {
                    expect(res).to.have.status(401)
                    expect(res.body.message).equal('You do not have access to this page!')
                    done()
                })
            })
        })

            //NOT AUTHORIZED USER
        it('should return 403 (ERROR : You are not authorized! )', function(done) {
            chai
                .request(app)
                .patch(`/products/${ProductId}`)
                .set('token', unauthorizedToken)
                .end(function(err, res) {  
                    expect(res).to.have.status(403)
                    expect(res.body).equal('You are not authorized!')
                    done()
                })
        })
        //Price Cast to datatype failed 
        it('should return 500 (ERROR : Cast to number failed  )', function(done) {
            chai
                .request(app)
                .patch(`/products/${ProductId}`)
                .set('token', token)
                .send({
                    price : 'abcdef'
                })
                .end(function(err, res) {  
                    expect(res.body.message).to.include('Cast to number failed')
                    expect(res).to.have.status(500)
                    done()
                })
        })
        //Price is below 0
        it('should return 400 (ERROR : Price should greater than equal 0)', function(done) {
            chai
                .request(app)
                .patch(`/products/${ProductId}`)
                .set('token', token)
                .send({
                    price : -1000
                })
                .end(function(err, res) {  
                    expect(res.body.message).to.include('Price should greater than equal 0')
                    expect(res).to.have.status(400)
                    done()
                })
        })
        //Stock is below 0
        it('should return 400 (ERROR : Stock should greater than equal 0)', function(done) {
            chai
                .request(app)
                .patch(`/products/${ProductId}`)
                .set('token', token)
                .send({
                    stock : -1000
                })
                .end(function(err, res) {  
                    expect(res.body.message).to.include('Stock should greater than equal 0')
                    expect(res).to.have.status(400)
                    done()
                })
        })

        //Stock Cast to datatype failed
        it('should return 500 (ERROR : Cast to number failed  )', function(done) {
            chai
                .request(app)
                .patch(`/products/${ProductId}`)
                .set('token', token)
                .send({
                    stock : 'abcdef'
                })
                .end(function(err, res) {  
                    expect(res.body.message).to.include('Cast to number failed')
                    expect(res).to.have.status(500)
                    done()
                })
        })

    })

    describe('DELETE Products', function() {

        describe('success parameter value', function() {
            it('should return 200 with an object of deleted data and Successfully delete product message', function(done) {
                chai
                    .request(app)
                    .delete(`/products/${ProductId}`)
                    .set('token', token)
                    .end(function(err, res) {
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('object')
                        expect(res.body.deleted._id).equal(ProductId)
                        expect(err).to.be.null
                        expect(res.body.message).equal('Successfully delete product')
                        done()
                    })
            })
        })

        describe('error parameter value', function() {

            //NOT AUTHENTICATED USER
            it('should return 401 (ERROR : You do not have access to this page! )', function(done) {
                chai
                    .request(app)
                    .delete(`/products/${ProductId}`)
                    .end(function(err, res) {
                        expect(res).to.have.status(401)
                        expect(res.body.message).equal('You do not have access to this page!')
                        done()
                    })
            })

            //NOT AUTHORIZED USER
            it('should return 403 (ERROR : You are not authorized! )', function(done) {
                chai
                    .request(app)
                    .delete(`/products/${ProductId}`)
                    .set('token', unauthorizedToken)
                    .end(function(err, res) {  
                        expect(res).to.have.status(403)
                        expect(res.body).equal('You are not authorized!')
                        done()
                    })
            })

            //Data Not Found
            it('should return 404 (ERROR : not found )', function(done) {

                chai
                    .request(app)
                    .delete(`/products/5cd97a2fb974a1fbd60c0042`)
                    .set('token', token)
                    .end(function(err, res) { 
                        expect(res).to.have.status(404)
                        expect(res.body.message).equal('not found')
                        done()
                    })
            })
        })
    })

     
})