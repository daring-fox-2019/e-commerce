const chai = require('chai')
    chaiHttp = require('chai-http')
    expect = chai.expect
    app = require('../app')
    // clearItem= require('../helpers/clearItem')
    // clearUser= require('../helpers/clearUser')    
chai.use(chaiHttp)
// before(function(done){
//     clearUser(done)
// })
// before(function(done){
//     clearItem(done)
// })
let productId =  ''

describe('Ecommerce test',function(){
    describe('POST user/register', function() {
        it('should send an object with 201 status code', function(done) {
            const newUser = {
                username : "viola jaco",
                email : 'viola@jaco.com',
                password : 'bethebest'
            }
            chai
                .request(app)
                .post('/user/register')
                .send(newUser)
                .then(res=>{
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('token')
                    done()
                })
                .catch(err =>{
                    console.log(err.message)
                })
        });
        it('should send an object with 400 status code', function(done) {
            const newUser = {
                username : 'viola jaco',
                email : 'viola@jaco.com',
                password : 'bethebest'
            }
            chai
                .request(app)
                .post('/user/register')
                .send(newUser)
                .then(res=>{
                    expect(res.body.email).to.be.an('object')
                    expect(res).to.have.status(400)
                    done()
                })
                .catch(err =>{
                    console.log(err.message)
                })
        })
    })
    describe('POST user/login', function() {
        it('should send an object with 200 status', function (done) {
            const user = {
                email : 'viola@jaco.com',
                password : 'bethebest'
            }
            chai
                .request(app)
                .post('/user/login')
                .send(user)
                .then(res=>{
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('token')
                    done()
                })
                .catch(err => {
                    console.log(err.message)
                })
        })
    })
    describe('POST /items',function(){
        it('should send an object of inserted with 201 status code',function(done){
            const newProduct = {
                userId : "knkn89797sg8jh9spjsa9obcaiscal7",
                itemId : _id,
                title : "Sweater Wool",
                description : "Afrixana style",
                price : 100000, 
                kategori : Tops,
                image : image.jpg,
                stock : 1
            };
            chai
                .request(app)
                .post('/items')
                .send(newProduct)
                .then((res)=>{
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('title')
                    expect(res.body).to.have.property('description')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('kategori')
                    expect(res.body).to.have.property('stock')
                    expect(res.body).to.have.property('mainPage')                    
                    expect(res.body.title).to.equal(newProduct.title)
                    expect(res.body.description).to.equal(newProduct.description)
                    expect(res.body.price).to.equal(newProduct.price)
                    expect(res.body.kategori).to.equal(newProduct.kategori)
                    expect(res.body.stock).to.equal(newProduct.stock)
                    expect(res.body.mainPage).to.equal(newProduct.mainPage)
                    productId = res.body._id
                    done()
                })
                .catch(err =>{
                    console.log(err.message)
                })
                
        })
    })
    describe('GET /items',function(){
        it('should send array of objects with 200 status code',function(done) {
            chai
                .request(app)
                .get('/items')
                .then(res=>{
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array')
                    done()
                })
                .catch(err =>{
                    console.log(err.message)
                })
        })
    })
    describe('GET /items/:id',function() {
        it('should send an object of parameters with 200 status code', function(done) {
            chai
                .request(app)
                .get(`/items/${productId}`)
                .then(res =>{
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('title')
                    expect(res.body).to.have.property('description')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('kategori')
                    expect(res.body).to.have.property('stock')
                    expect(res.body).to.have.property('mainPage')
                    done()
                })
                .catch(err=>{
                    console.log(err)
                })
        })
    })
    describe('DELETE /items/:id',function() {
        it('should send a message with 200 status code', function(done) {
            chai
                .request(app)
                .delete(`/items/${productId}`)
                .then(res =>{
                    expect(res).to.have.status(200)
                    done()
                })
                .catch(err =>{
                    console.log(err)
                })
        })
    })

})