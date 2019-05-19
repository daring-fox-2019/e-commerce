const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const clearProductDummy = require('../helpers/clearProductDummy')

chai.use(chaiHttp)

// before(function(done) {
//     clearProductDummy(done)    
// })

// after(function(done){
//     clearProductDummy(done)
// })

describe('Product tests', function(){
    describe('GET /products', function(){
        it('should send array with 200 status code', function(done){
            chai.request(app)
                .get('/products')
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
        })
    })

    describe('POST /products', function(){
        it('should send an object of inserted product with status 201', function(done){
            const newProduct ={
                name: 'HDD',
                description: "HDD Seagate 1tb",
                price: 790000,
                image_url: 'https://00e9e64bac989b5253cbbea06f85e4c20469c25e7fdedb3736-apidata.googleusercontent.com/download/storage/v1/b/image-storage.sukmaranggapradeta.com/o/hacktiv8.jpeg?qk=AD5uMEu64NqHhGABZzqWTdoaL_Nn3DhaZhdjUbpn2EjDLEbPb6xKErtJhH_b3efjiBPf1v29lFDaQNZsYEyB1JmVZoa1As8yFC1gMAvXsYBtVB8c3mdbsTWMaO_r702elEu39EM1TewmaogC6VmM-lAbJWFXk-m-6Hn5jbn1FCTVmSYOjacjfiwEny43rtf4kAoBHxk0D4KDLE20xXqIvn56zVGYxJQYS0T_p1BJEkFUvMqK0b-11-bZVBu_kgekTAff5A9auWfgqrLS_w5709UL9UqmT5stfyTr1qoVSv0q143Ghnqp3-FzMqOV9ER1q9WRT2EuPrv95X3UpvQK3B8ZtVfU4Du4ZDRCldQifVqm4WyD5xhZfW_dBFkRTcWeymlpix2B6haPo1_Kqizg1_OtMuyweMLcP93dV8UxuAXMq7I2t4Epoqjz6nGd4vl-zPX_9kC0fieBsFcYOAGQ8X9mBz6QKhFkT9iIlbNMEI9FMC3s3ZIukOFhk6sWGmU5DYVlo-xX0vw6zUcgfDUVzPhtm0ZtfRcKo8iAZOPZkJfFyfQXctktgTCmDDp1GnR_llThi705hJOSOnrlgT0yy9fi0YuoVDPsrTyS6b8M7b6e8zr8J1iTGRZy5I3cvqPldfLnfZXS_q943eX8BmI6m4J36FVGWfp2RAOIDrjNLrzwnNTq9KwVtlV-YquUBnWQkRyJDzEDlUx3fPGs9QKHN-GUB2FktlSqe9oXBS4QzfvaGGLQDyUm8LnZf4OB3-wH2NcxukVA4pgEgBClu1wFUmVpyXZ0A709vNPYgFrfa-Awok2Gp_rtEN8',
                category: "komputer",
                stock: 10
            }
            chai.request(app)
                .post('/products')
                .send(newProduct)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('description')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('image_url')
                    expect(res.body).to.have.property('category')
                    expect(res.body).to.have.property('stock')
                    expect(res.body.name).to.equal(newProduct.name)
                    expect(res.body.description).to.equal(newProduct.description)
                    expect(res.body.price).to.equal(newProduct.price)
                    expect(res.body.image_url).to.equal(newProduct.image_url)
                    expect(res.body.category).to.equal(newProduct.category)
                    expect(res.body.stock).to.equal(newProduct.stock)
                    done()
                })
        })
    })
    describe('PUT /products', function(){
        it('should send object of updated with 200 status code', function(done){
            let id = '5cd91df3fb7dd15839aeaf5f'
            const updateData ={
                name: 'HDD',
                description: "HDD Seagate 1tb",
                price: 790000,
                image_url: 'https://00e9e64bac989b5253cbbea06f85e4c20469c25e7fdedb3736-apidata.googleusercontent.com/download/storage/v1/b/image-storage.sukmaranggapradeta.com/o/hacktiv8.jpeg?qk=AD5uMEu64NqHhGABZzqWTdoaL_Nn3DhaZhdjUbpn2EjDLEbPb6xKErtJhH_b3efjiBPf1v29lFDaQNZsYEyB1JmVZoa1As8yFC1gMAvXsYBtVB8c3mdbsTWMaO_r702elEu39EM1TewmaogC6VmM-lAbJWFXk-m-6Hn5jbn1FCTVmSYOjacjfiwEny43rtf4kAoBHxk0D4KDLE20xXqIvn56zVGYxJQYS0T_p1BJEkFUvMqK0b-11-bZVBu_kgekTAff5A9auWfgqrLS_w5709UL9UqmT5stfyTr1qoVSv0q143Ghnqp3-FzMqOV9ER1q9WRT2EuPrv95X3UpvQK3B8ZtVfU4Du4ZDRCldQifVqm4WyD5xhZfW_dBFkRTcWeymlpix2B6haPo1_Kqizg1_OtMuyweMLcP93dV8UxuAXMq7I2t4Epoqjz6nGd4vl-zPX_9kC0fieBsFcYOAGQ8X9mBz6QKhFkT9iIlbNMEI9FMC3s3ZIukOFhk6sWGmU5DYVlo-xX0vw6zUcgfDUVzPhtm0ZtfRcKo8iAZOPZkJfFyfQXctktgTCmDDp1GnR_llThi705hJOSOnrlgT0yy9fi0YuoVDPsrTyS6b8M7b6e8zr8J1iTGRZy5I3cvqPldfLnfZXS_q943eX8BmI6m4J36FVGWfp2RAOIDrjNLrzwnNTq9KwVtlV-YquUBnWQkRyJDzEDlUx3fPGs9QKHN-GUB2FktlSqe9oXBS4QzfvaGGLQDyUm8LnZf4OB3-wH2NcxukVA4pgEgBClu1wFUmVpyXZ0A709vNPYgFrfa-Awok2Gp_rtEN8',
                category: "komputer",
                stock: 101
            }
            chai.request(app)
                .put('/products'+id)
                .send(updateData)
                .end(function(err, res){
                    // expect(err).to.be.null
                    expect(res).to.have.status(200)
                    done()
                })
        })
    })
    describe('DELETE /products', function(){
        it('should send object of deleted with 200 status code', function(done){
            let id = '5cd90f7db3bd553e46f4cfbd'
            chai.request(app)
                .delete('/products/'+id)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    done()
                })
        })
    })
})

describe('User tests', function(){
    describe('POST /users/signup', function(){
        it('should send an object of inserted user with status 201', function(done){
            const newUser ={
                name: 'sasuke',
                email: 'sasuke@gmail.com',
                password: 'sasuke',
            }
            chai.request(app)
                .post('/users/signup')
                .send(newUser)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('email')
                    expect(res.body).to.have.property('password')
                    expect(res.body.name).to.equal(newUser.name)
                    expect(res.body.email).to.equal(newUser.email)
                    expect(res.body.password).to.equal(newUser.password)
                    done()
                })
        })
    })
    describe('GET /users', function(){
        it('should send array of user with status code 200', function(done){
            chai.request(app)
                .get('/users')
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
        })
    })
    describe('POST /users/login', function(){
        it('should send of user login with status code 200', function(done){
            const inputUser ={
                email: 'naruto@gmail.com',
                password: 'naruto'
        }
            chai.request(app)
                .post('/users/login')
                .send(inputUser)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    done()
                })
        })
    })
})

// describe('Cart tests', function(){
//     describe('POST /carts', function(){
//         it('should send an object of inserted product with status 201', function(done){
//             const newCart ={
//                 member: '5cd93460d8db0770e85abb84',
//                 items: "5cda60255ae9f866cb840262",
//             }
//             chai.request(app)
//                 .post('/carts')
//                 .send(newCart)
//                 .end(function(err, res){
//                     expect(err).to.be.null
//                     expect(res).to.have.status(201)
//                     expect(res.body).to.be.an('object');
//                     expect(res.body).to.have.property('_id')
//                     expect(res.body).to.have.property('member')
//                     expect(res.body).to.have.property('items')
//                     expect(res.body.member).to.equal(newProduct.member)
//                     expect(res.body.items).to.equal(newProduct.items)
//                     done()
//                 })
//         })
//     })

//     describe('DELETE /carts', function(){
//         it('should send object of deleted with 200 status code', function(done){
//             chai.request(app)
//                 .delete('/carts/')
//                 .end(function(err, res){
//                     expect(err).to.be.null
//                     expect(res).to.have.status(200)
//                     done()
//                 })
//         })
//     })
// })