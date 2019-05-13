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

after(function(done) {
    clearUser(done);
});

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
})