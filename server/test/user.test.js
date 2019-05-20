const   chai        = require('chai')
        chaiHttp    = require('chai-http')
        expect      = chai.expect
        app         = require('../app')

chai.use(chaiHttp)

describe('User tests', function(){

//     describe('GET /users', function(){
//         it(`should send an array with 200 code`,function(done){
//             chai
//             .request(app)
//             .get('/products')
//             .end(function(err,res){
//                 expect(err).to.be.null;
//                 expect(res).to.have.status(200);
//                 expect(res.body).to.be.an('array');
//                 done()
//             })
//         })
//     })

    // describe('POST /register', function(){
        // it(`should send an object of inserted user with 200 status code`,function(done){
        //     const newUser = {
        //         firstName : 'rizky',
        //         lastName: 'andijani',
        //         email: 'rizky@mail.com',
        //         password: '12345'
        //     }
        //     chai
        //         .request(app)
        //         .post('/register')
        //         .send(newUser)
        //         .end(function(err,res){
        //             expect(err).to.be.null;
        //             expect(res).to.have.status(200);
        //             expect(res.body).to.be.an('object');
        //             expect(res.body).to.have.property('_id');
        //             expect(res.body).to.have.property('firstName');
        //             expect(res.body).to.have.property('lastName');
        //             expect(res.body).to.have.property('email');
        //             expect(res.body).to.have.property('password');
        //             expect(res.body.firstName).to.equal(newUser.firstName);
        //             expect(res.body.lastName).to.equal(newUser.lastName);
        //             expect(res.body.email).to.equal(newUser.email);
        //             // expect(res.body.password).to.equal(newUser.password);
        //             done()
        //         })
        // })

    //     it(`should send an error email is not valid with status code 500`,function(done){
    //             const newUser = {
    //                 firstName : 'rizky',
    //                 lastName: 'andijani',
    //                 email: 'ri',
    //                 password: '12345'
    //             }
    //             chai
    //                 .request(app)
    //                 .post('/register')
    //                 .send(newUser)
    //                 .end(function(err,res){
    //                     expect(err).to.be.null;
    //                     expect(res).to.have.status(500);
    //                     // expect(res.body.password).to.equal(newUser.password);
    //                     done()
    //                 })
    //         })

    //         it(`should send an error email is already taken with status code 500`,function(done){
    //             const newUser = {
    //                 firstName : 'rizky',
    //                 lastName: 'andijani',
    //                 email: 'rizky@mail.com',
    //                 password: '12345'
    //             }
    //             chai
    //                 .request(app)
    //                 .post('/register')
    //                 .send(newUser)
    //                 .end(function(err,res){
    //                     expect(err).to.be.null;
    //                     expect(res).to.have.status(500);
    //                     // expect(res.body.password).to.equal(newUser.password);
    //                     done()
    //                 })
    //         })
    // })

    // describe('POST /login',function(){
    //     it('should send a token of logged user with 201 status code',function(done){
    //         const loginUser = {
    //             email : "rizky@mail.com",
    //             password: "12345"
    //         }
    //         chai
    //             .request(app)
    //             .post('/login')
    //             .send(loginUser)
    //             .end(function(err,res){
    //                 expect(err).to.be.null;
    //                 expect(res).to.have.status(201);
    //                 expect(res.body).to.be.an('object');
    //                 expect(res.body).to.have.property('token')
    //                 done()
    //             })
    //     })        
    // })
})