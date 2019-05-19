// const chai = require('chai')
// const chaiHttp = require('chai-http')
// const expect = chai.expect
// const app = require('../app')
// const clearUser = require('../helpers/clearUser')

// chai.use(chaiHttp)

// before(function (done) {
//     clearUser(done)
// })

// after(function (done) {
//     clearUser(done)
// })

// describe("Cart tests", function(){
//     describe("POST /cart", function(){
//         it("Should send recently created object with status code 201", function(done){
//             const newCart = {
//                 user: "User",
//                 products: ["Product1", "Product2"]
//             }
//             chai
//                 .request(app)
//                 .post('/cart')
//                 .send(newCart)
//                 .end(function(err, res){
//                     expect(err).to.be.null
//                     expect(res).to.have.status(201)
//                     expect(res.body).to.have.property("user")
//                     expect(res.body).to.have.property("products")
//                     done()
//                 })
//         })
//     })
// })