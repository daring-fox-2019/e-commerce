const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const User = require('../models/user')
const Product = require('../models/product')
const Category = require('../models/category')
const jwt = require('../helpers/jwt')

chai.use(chaiHttp)
let token = null;
let productId = null;
let categoryId = null;

describe ('Product END POINT test AS ADMIN', function() {

    before (function (done) {
        let newUser = {
            name: 'Paulina',
            email: "paul@gmail.com",
            role: "admin",
            password: "123456"
        }

        User.create(newUser)
        .then((user) =>{
            let {name,email,_id} = user
            jwt.sign({id : _id, email, name}, 'paulina')
        })
        .catch(err => {
            done()
        })

        Category.create({name : 'Hewani'})
        .then(cat => {
            let { _id } = cat
            categoryId = _id
     
            done()
        })
        .catch(err => {
            done()
            
        })
    })

    after(function (done) {
        Product.deleteMany({})
        .then(() => {})
        .catch(err => {done()})

        Category.deleteMany({})
        .then(() => {})
        .catch(err => {done()})

        User.deleteMany({})
        .then(() => {done()})
        .catch(err => {done()})
    })

    describe('POST /users/login', function () {
        describe('success login', function () {
            it('app should return status 200 as an object with token', function (done) {
                let login = {
                    email: 'paul@gmail.com',
                    password: '123456'
                }
                chai
                .request(app)
                .post('/users/login')
                .send(login)
                .then((res) => {
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('token')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                    expect(res.body.name).to.equal('Paulina');
                    token = res.body.token
                    console.log(token, 'TOKEN DIATAS UDAH KEISIIII')     
                    done()
                })
                .catch(err => {
                    console.log(err);
                })
            })
        })
    })

    describe('POST /products', function() {
        describe('success create product', function() {
            it('app should return status 201 as an object of new product', function (done) {
                let newProduct = {
                    price: 20000,
                    name: 'Cacing',
                    image: 'http://imageurl.cacing.com',
                    stock: 10,
                    description : 'Cacing kremi',
                    category : categoryId
                }

                chai
                .request(app)
                .post('/products')
                .send(newProduct)
                .set('token', token)
                .then(res => {
                    
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('image')
                    expect(res.body).to.have.property('category')
                    expect(res.body).to.have.property('stock')
                    expect(res.body.name).to.equal('Cacing');
                    expect(res.body.price).to.equal(20000)
                    expect(res.body.image).to.equal( 'http://imageurl.cacing.com')
                    expect(res.body.description).to.equal('Cacing kremi')
                    productId = res.body._id
                    done()
                })
                .catch(err => {
                    done()
                })
            })
        })

        describe('fail create product', function() {
            it ('app should return status 400 and msg product name must be filled', function (done) {
                let newProduct = {
                    name: '',
                    price: 20000,
                    image: 'http://imageurl.cacing.com',
                    stock: 10,
                    description : 'Cacing kremi',
                    category : categoryId
                }
                
                chai
                .request(app)
                .post('/products')
                .send(newProduct)
                .set('token', token)
                .then(res => {
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body.errors.name.message).to.include('Product name must be filled')
                    done()
                })
                .catch(err => {
                    done()
                })
            })

            it ('app should return status 400 and msg price must be filled', function (done) {
                let newProduct = {
                    name: 'Cuacing',
                    price: '',
                    image: 'http://imageurl.cacing.com',
                    stock: 10,
                    description : 'Cacing kremi',
                    category : categoryId
                }
                
                chai
                .request(app)
                .post('/products')
                .send(newProduct)
                .set('token', token)
                .then(res => {
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body.errors.price.message).to.include('Price cannot be empty')
                    done()
                })
                .catch(err => {
                    done()
                })
            })
        
            it ('app should return status 400 and msg stock must be filled', function (done) {
                let newProduct = {
                    name: 'Cuacing',
                    price: 20202,
                    image: 'http://imageurl.cacing.com',
                    stock: '',
                    description : 'Cacing kremi',
                    category : categoryId
                }
                
                chai
                .request(app)
                .post('/products')
                .send(newProduct)
                .set('token', token)
                .then(res => {
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body.errors.stock.message).to.include('Stock must be filled')
                    done()
                })
                .catch(err => {
                    done()
                })
            })
        

            it ('app should return status 400 and msg category must be filled', function (done) {
                let newProduct = {
                    name: 'Cuacing',
                    price: 20202,
                    image: 'http://imageurl.cacing.com',
                    stock: 2,
                    description : 'Cacing kremi',
                }
                
                chai
                .request(app)
                .post('/products')
                .send(newProduct)
                .set('token', token)
                .then(res => {
                    // console.log(res, 'apa salahanya');
                    
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body.errors.category.message).to.include('Category cannot be empty')
                    done()
                })
                .catch(err => {
                    done()
                })
            })

            it ('app should return status 400 and msg description must be filled', function (done) {
                let newProduct = {
                    name: 'Cuacing',
                    price: 20202,
                    image: 'http://imageurl.cacing.com',
                    stock: 2,
                    description : '',
                    category : categoryId
                }
                
                chai
                .request(app)
                .post('/products')
                .send(newProduct)
                .set('token', token)
                .then(res => {
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body.errors.description.message).to.include('Description cannot be empty')
                    done()
                })
                .catch(err => {
                    done()
                })
            })
        

            it ('app should return status 400 and msg price minimum is 0 due to negative number input', function (done) {
                let newProduct = {
                    name: 'Cuacing',
                    price: -1000,
                    image: 'http://imageurl.cacing.com',
                    stock: 2,
                    description : 'Cacing kremi',
                    category : categoryId
                }
                
                chai
                .request(app)
                .post('/products')
                .send(newProduct)
                .set('token', token)
                .then(res => {                    
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body.errors.price.message).to.include('Minimum price is 0')
                    done()
                })
                .catch(err => {
                    done()
                })
            })

            it ('app should return status 400 and msg stock minimum is 0 due to negative number input', function (done) {
                let newProduct = {
                    name: 'Cuacing',
                    price: 21000,
                    image: 'http://imageurl.cacing.com',
                    stock: -1000,
                    description : 'Cacing kremi',
                    category : categoryId
                }
                
                chai
                .request(app)
                .post('/products')
                .send(newProduct)
                .set('token', token)
                .then(res => {                    
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body.errors.stock.message).to.include('Minimum stock is 0')
                    done()
                })
                .catch(err => {
                    done()
                })
            })

            it ('app should return status 400 and msg cast to number failed at path price due to string input', function (done) {
                let newProduct = {
                    name: 'Cuacing',
                    price: 'sdfghjk',
                    image: 'http://imageurl.cacing.com',
                    stock: 2,
                    description : 'Cacing kremi',
                    category : categoryId
                }
                chai
                .request(app)
                .post('/products')
                .send(newProduct)
                .set('token', token)
                .then(res => {   
                    // console.log(res,'HEHEHEEHEH');
                                                         
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body.errors.price.message).to.include('Cast to Number failed')
                    done()
                })
                .catch(err => {
                    done()
                })
            })


            it ('app should return status 400 and msg cast to number failed at path stock due to string input', function (done) {
                let newProduct = {
                    name: 'Cuacing',
                    price: 1200,
                    image: 'http://imageurl.cacing.com',
                    stock: 'asdakdad',
                    description : 'Cacing kremi',
                    category : categoryId
                }
                chai
                .request(app)
                .post('/products')
                .send(newProduct)
                .set('token', token)
                .then(res => {                                        
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body.errors.stock.message).to.include('Cast to Number failed')
                    done()
                })
                .catch(err => {
                    done()
                })
            })
        
        })


    })

    // START GET ALL PRODUCTS
    describe('GET /products', function () {
        describe('success fetching all products', function () {
            it('app should return status 200 as an array of object products', function (done) {
                chai
                .request(app)
                .get('/products')
                .then((res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
                .catch(err => {
                    done()
                })
            })
        })
    })

    // START GET ONE PRODUCT
    describe('GET /products/:id', function () {
        describe('success fetching one product', function () {
            it('app should return status 200 as an object of product', function (done) {
                chai
                .request(app)
                .get(`/products/${productId}`)
                .then((res) => {                    
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('image')
                    expect(res.body).to.have.property('category')
                    expect(res.body).to.have.property('stock')
                    expect(res.body.name).to.equal('Cacing');
                    expect(res.body.price).to.equal(20000)
                    expect(res.body.image).to.equal(['http://imageurl.cacing.com'])
                    expect(res.body.description).to.equal('Cacing kremi')
                    done()
                })
                .catch(err => {
                    done()
                })
            })
        })

        describe('fail fetching one product', function () {
            it('app should return status 404 as product id is not found', function (done) {
                chai
                .request(app)
                .get(`/products/5cd9737b62a8274d09d3579c`)
                .then((res) => {                    
                    expect(res).to.have.status(404)
                    expect(res.body.msg).to.equal('Product not found')
                    done()
                })
                .catch(err => {
                    done()
                })
        })
    })







    // START UPDATE PRODUCTS

    describe('PATCH /products/:id', function () {
        describe('success patching product', function () {
            it('app should return status 200 as an object with its new updated value', function (done) {
                let newProduct = {
                    name: 'Ancylostoma duodenale',
                    price: 1000,
                    image : 'http://imageurl.cacing.com'
                }

                chai
                .request(app)
                .patch(`/products/${productId}`)
                .set('token', token)
                .send(newProduct)
                .then((res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('image')
                    expect(res.body).to.have.property('category')
                    expect(res.body).to.have.property('stock')
                    expect(res.body.name).to.equal('Ancylostoma duodenale');
                    expect(res.body.price).to.equal(1000)
                    expect(res.body.image).to.equal(['http://imageurl.cacing.com'])
                    done()
                })
                .catch(err => {
                    done()
                })

            })
        })


        describe('fail patching product', function () {
            it('app should return status 401 as the user is not authenticated', function (done) {
                let newProduct = {
                    name: 'Ancylostoma duodenale',
                    price: 1000,
                }
                chai
                .request(app)
                .patch(`/products/${productId}`)
                .send(newProduct)
                .then((res) => {
                    
                    expect(res).to.have.status(401)
                    expect(res.body.message).to.include('Unauthenticated user')

                    done()
                    
                })
                .catch(err => {
                    done()
                })
            })


            it('app should return status 400 and msg product name must be filled', function (done) {
                let newProduct = {
                    name: '',
                    price: 1000,
                }
                chai
                .request(app)
                .patch(`/products/${productId}`)
                .send(newProduct)
                .set('token', token)
                .then((res) => {
                    expect(res).to.have.status(400)
                    expect(res.body.errors.name.message).to.include('Product name must be filled')

                    done()
                    
                })
                .catch(err => {
                    done()
                })
            })

            it('app should return status 400 and msg product price must be filled', function (done) {
                let newProduct = {
                    name: 'Fasciola Hepatica',
                    price: '',
                }
                chai
                .request(app)
                .patch(`/products/${productId}`)
                .send(newProduct)
                .set('token', token)
                .then((res) => {                                        
                    expect(res).to.have.status(400)
                    expect(res.body.errors.price.message).to.include('Price cannot be empty')
                    done()
                    
                })
                .catch(err => {
                    done()
                })
            })

            it('app should return status 400 and msg product stock must be filled', function (done) {
                let newProduct = {
                    name: 'Wuchereria bancroftii',
                    price: 20202,
                    image: 'http://imageurl.cacing.com',
                    stock: '',
                    description : 'Cacing kremi',
                    category : categoryId
                }
                chai
                .request(app)
                .patch(`/products/${productId}`)
                .send(newProduct)
                .set('token', token)
                .then((res) => {   
                    expect(res).to.have.status(400)
                    expect(res.body.errors.stock.message).to.equal('Stock must be filled')
                    done()              
                })
                .catch(err => {
                    done()
                })
            })

            it('app should return status 400 and msg product description must be filled', function (done) {
                let newProduct = {
                    name: 'Wuchereria bancroftii',
                    price: 20202,
                    image: 'http://imageurl.cacing.com',
                    stock: 12,
                    description : '',
                    category : categoryId
                }
                chai
                .request(app)
                .patch(`/products/${productId}`)
                .send(newProduct)
                .set('token', token)
                .then((res) => {   
                    expect(res).to.have.status(400)
                    expect(res.body.errors.description.message).to.equal('Description cannot be empty')
                    done()              
                })
                .catch(err => {
                    done()
                })
            })

            it('app should return status 400 and msg product category must be filled', function (done) {
                let newProduct = {
                    name: 'Wuchereria bancroftii',
                    price: 20202,
                    image: 'http://imageurl.cacing.com',
                    stock: 12,
                    description : 'Hehe cacing....',
                    category : ''
                }
                chai
                .request(app)
                .patch(`/products/${productId}`)
                .send(newProduct)
                .set('token', token)
                .then((res) => {   
                    expect(res).to.have.status(400)
                    expect(res.body.errors.category.message).to.equal('Category cannot be empty')
                    done()              
                })
                .catch(err => {
                    done()
                })
            })

            it('app should return status 400 and msg product image must be filled', function (done) {
                let newProduct = {
                    name: 'Wuchereria bancroftii',
                    price: 20202,
                    image: [],
                    stock: 12,
                    description : 'Hehe cacing....',
                    category : categoryId
                }
                chai
                .request(app)
                .patch(`/products/${productId}`)
                .send(newProduct)
                .set('token', token)
                .then((res) => {                       
                    expect(res).to.have.status(400)
                    expect(res.body.errors.message).to.include('Image cannot be empty')
                    done()              
                })
                .catch(err => {
                    done()
                })
            })

            it('app should return status 400 and msg price minimum is 0 due to negative number input', function (done) {
                let newProduct = {
                    name: 'Wuchereria bancroftii',
                    price: -101010,
                    image: 'http://imageurl.cacing.com',
                    stock: 12,
                    description : 'Hehe cacing....',
                    category : categoryId
                }
                chai
                .request(app)
                .patch(`/products/${productId}`)
                .send(newProduct)
                .set('token', token)
                .then((res) => {    
                    expect(res).to.have.status(400)
                    expect(res.body.errors.price.message).to.equals('Minimum price is 0')
                    done()              
                })
                .catch(err => {
                    done()
                })
            })
            
            it('app should return status 400 and msg stock minimum is 0 due to negative number input', function (done) {
                let newProduct = {
                    name: 'Wuchereria bancroftii',
                    price: 1000,
                    image: 'http://imageurl.cacing.com',
                    stock: -12,
                    description : 'Hehe cacing....',
                    category : categoryId
                }
                chai
                .request(app)
                .patch(`/products/${productId}`)
                .send(newProduct)
                .set('token', token)
                .then((res) => {                                           
                    expect(res).to.have.status(400)
                    expect(res.body.errors.stock.message).to.equals('Minimum stock is 0')
                    done()              
                })
                .catch(err => {
                    done()
                })
            })

            it('app should return status 400 and msg cast to number failed at path stock due to string input', function (done) {
                let newProduct = {
                    name: 'Wuchereria bancroftii',
                    price: 1000,
                    image: 'http://imageurl.cacing.com',
                    stock: 'xxxxxxxx',
                    description : 'Hehe cacing....',
                    category : categoryId
                }
                chai
                .request(app)
                .patch(`/products/${productId}`)
                .send(newProduct)
                .set('token', token)
                .then((res) => { 
                    expect(res).to.have.status(400)
                    expect(res.body.errors.stock.message).to.include('Cast to number failed')
                    done()              
                })
                .catch(err => {
                    done()
                })
            })

            it('app should return status 400 and msg cast to number failed at path price due to string input', function (done) {
                let newProduct = {
                    name: 'Wuchereria bancroftii',
                    price: 'asasdasdsad',
                    image: 'http://imageurl.cacing.com',
                    stock: 15,
                    description : 'Hehe cacing....',
                    category : categoryId
                }
                chai
                .request(app)
                .patch(`/products/${productId}`)
                .send(newProduct)
                .set('token', token)
                .then((res) => {                                                            
                    expect(res).to.have.status(400)
                    expect(res.body.message).to.include('Cast to number failed')
                    done()              
                })
                .catch(err => {
                    done()
                })
            })

            it('app should return status 404 and msg product id is not found', function (done) {
                let newProduct = {
                    name: 'Wuchereria bancroftii',
                    price: 122,
                    image: 'http://imageurl.cacing.com',
                    stock: 15,
                    description : 'Hehe cacing....',
                    category : categoryId
                }
                chai
                .request(app)
                .patch(`/products/5cd9737b62a8274d09d3579c`)
                .send(newProduct)
                .set('token', token)
                .then((res) => {      
                    expect(res.body.msg).to.equal('Product not found')
                    expect(res).to.have.status(404)
                    done()              
                })
                .catch(err => {
                    done()
                })
            })
        })
    })
    
    //START DELETE PRODUCTS
    describe('DELETE /products/:id', function () {
        describe('fail deleting product', function () {
            it('app should return status 401 as user is not authenticated', function (done) {
                chai
                .request(app)
                .delete(`/products/${productId}`)
                .then((res) => {
                    expect(res).to.have.status(401)
                    expect(res.body.message).to.include('Unauthenticated user')
                    done()
                })
                .catch(err => {
                    done()
                })
            })

            it('app should return status 404 as product id is not found', function (done) {
                chai
                .request(app)
                .delete(`/products/5cd9737b62a8274d09d3579c`)
                .set('token', token)
                .then((res) => {
                    expect(res.body.msg).to.equal('Product not found')
                    expect(res).to.have.status(404)
                    done()
                })
                .catch(err => {
                    done()
                })
            })
        })

        describe('success deleting product', function () {
            it('app should return status 200 as an object', function (done) {
                chai
                .request(app)
                .delete(`/products/${productId}`)
                .set('token', token)
                .then((res) => {                    
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('image')
                    expect(res.body).to.have.property('category')
                    expect(res.body).to.have.property('stock')
                    done()
                })
                .catch(err => {
                    done()
                })
            })
        })

        })

    })

})


// LOGGED IN AS A CUSTOMER

describe('Product END POINT test AS CUSTOMER', function() {

    before (function (done) {
        let newUser = {
            name: 'Paulina',
            email: "paul@gmail.com",
            role: "customer",
            password: "123456"
        }

        User.create(newUser)
        .then((user) =>{
            let {name,email,_id} = user
            jwt.sign({id : _id, email, name}, 'paulina')
        })
        .catch(err => {
            done()
        })

        Category.create({name : 'Hewani'})
        .then(cat => {
            let { _id } = cat
            categoryId = _id
            
            done()
        })
        .catch(err => {
            done()
            
        })

    })

    after(function (done) {
        Product.deleteMany({})
        .then(() => {})
        .catch(err => {done()})

        User.deleteMany({})
        .then(() => {done()})
        .catch(err => {done()})
    })

    describe('POST /users/login', function () {
        describe('success login', function () {
            it('app should return status 200 as an object with token', function (done) {
                let login = {
                    email: 'paul@gmail.com',
                    password: '123456'
                }
                chai
                .request(app)
                .post('/users/login')
                .send(login)
                .then((res) => {
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('token')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                    expect(res.body.name).to.equal('Paulina');
                    token = res.body.token
                    console.log(token, 'TOKEN DIATAS UDAH KEISIIII')     
                    done()
                })
                .catch(err => {
                    done()
                })
            })
        })
    })

    describe('POST /products', function() {
        describe('fail create product as customer', function() {
            it ('app should return status 401 due to logging in as cutstomer', function (done) {
                let newProduct = {
                    price: 20000,
                    name: 'Cacing',
                    image: 'http://imageurl.cacing.com',
                    stock: 10,
                    description : 'Cacing kremi',
                    category : categoryId
                }

                chai
                .request(app)
                .post('/products')
                .send(newProduct)
                .set('token', token)
                .then(res => {         
                    expect(res).to.have.status(401)
                    expect(res.body.msg).to.equal('Not authorized to conduct actions')
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
            })
        })
    })


    describe('PATCH /products', function() {
        describe('fail patching product as customer', function () {
            it('app should return status 401 as the user is not authenticated', function (done) {
                let newProduct = {
                    name: 'Ancylostoma duodenale',
                    price: 1000,
                }
                chai
                .request(app)
                .patch(`/products/${productId}`)
                .set('token', token)
                .send(newProduct)
                .then((res) => {
                    
                    expect(res).to.have.status(401)
                    expect(res.body.message).to.include('Not authorized to conduct actions')

                    done()
                    
                })
                .catch(err => {
                    done()
                })
            })
        })
    })

    describe('DELETE /products/:id', function () {
        describe('fail deleting product as customer', function () {
            it('app should return status 401 as user is not authenticated', function (done) {
                chai
                .request(app)
                .delete(`/products/${productId}`)
                .set('token', token)
                .then((res) => {
                    expect(res).to.have.status(401)
                    expect(res.body.message).to.include('Not authorized to conduct actions')
                    done()
                })
                .catch(err => {
                    done()
                })
            })
        })
    })
})