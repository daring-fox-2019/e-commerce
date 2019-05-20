const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const clearUser = require('../helpers/clearUser')

chai.use(chaiHttp)

before(function (done) {
    clearUser(done)
})

after(function (done) {
    clearUser(done)
})

describe("Cart tests", function(){
    // Must provide a token
    describe("POST /cart", function(){
        it("Should respond with an error for not being authenticated with status error 500", function(done){
            const newCart = {
                user: "User",
                products: "product"
            }
            chai
                .request(app)
                .post('/cart')
                .send(newCart)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    done()
                })
        })
    })
    describe("GET /cart", function(){
        it("Should respond with an error for not being authenticated with status error 500", function(done){
            chai
                .request(app)
                .get('/cart')
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    done()
                })
        })
    })
    describe("GET /cart", function(){
        it("Should respond with an error for not being authenticated with status error 500", function(done){
            chai
                .request(app)
                .patch('/cart')
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    done()
                })
        })
    })
    describe("GET /cart", function(){
        it("Should respond with an error for not being authenticated with status error 500", function(done){
            chai
                .request(app)
                .delete('/cart')
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    done()
                })
        })
    })

    // describe("POST /cart", function(){
    //     it("Should send recently created object with status code 201", function(done){
    //         const newCart = {
    //             user: "User",
    //             products: ["Product1", "Product2"]
    //         }
    //         chai
    //             .request(app)
    //             .post('/cart')
    //             .send(newCart)
    //             .end(function(err, res){
    //                 expect(err).to.be.null
    //                 expect(res).to.have.status(201)
    //                 expect(res.body).to.have.property("user")
    //                 expect(res.body).to.have.property("products")
    //                 done()
    //             })
    //     })
    // })
})