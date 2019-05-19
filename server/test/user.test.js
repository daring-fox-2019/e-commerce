const chai      = require('chai'),
      chaiHttp  = require('chai-http'),
      expect    = chai.expect,
      app       = require('../app')
      clearUser = require('../helpers/clearUser');

const userCreate = {
    name: 'lutfi',
    email: 'lutfi@dummy.com',
    password: '1234'
}
let userTest={}

chai.use(chaiHttp);

before(function(done) {
    clearUser(done)
    
    // INITIAL USER
    chai
        .request(app)
        .post('/users/signup')
        .send(userCreate)
        .end(function(err, res) {
            userTest= res.body
    });
    // end INITIAL USER
});

// after(function(done) {
//     clearUser(done);
// });

describe('User Test', function() {
    describe('POST /users/signin', function() {
        it('should send an object of user loggedin user with 200 status code', function(done) {
            chai
                .request(app)
                .post('/users/signin')
                .send({
                    email: userCreate.email,
                    password: userCreate.password
                })
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('token');
                    expect(res.body).to.have.property('name');
                    expect(res.body.name).to.equal(`${userTest.name}`);
                    expect(res.body.email).to.equal(`${userTest.email}`);
                    done();
                });
        })
    })

    it("should success register user with status 201 with no error", function (done) {
        let user = {
            name: "lutfi",
            email: "lutfi@email.com",
            password: "12345"
        };

        chai
        .request(app)
        .post("/users/signup")
        .send(user)
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res.body).to.be.an("object")
            expect(res.body.name).to.equal("lutfi")
            expect(res.body).to.have.keys(["token","name","picture"]);
            done()
        });
    });

    it("should error with error code 400", function(done){
        let errorUser ={}
        chai
        .request(app)
        .post("/users/register")
        .send(errorUser)
        .end(function(err, res){
            console.log(JSON.stringify(res.body,null,3))
            expect(err).to.be.null;
            expect(res).to.have.status(400)
            done()
        })
    });
})