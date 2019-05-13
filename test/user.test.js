const chai      = require('chai'),
      chaiHttp  = require('chai-http'),
      expect    = chai.expect,
      app       = require('../app')
      clearUser = require('../helpers/clearUser');

const userTest = {
    name: 'lutfi',
    email: 'lutfi@x.com',
    password: '1234'
}

chai.use(chaiHttp);

before(function(done) {
    clearUser(done)

    // INITIAL USER
    chai
        .request(app)
        .post('/users/signup')
        .send(userTest)
        .end(function(err, res) {
            userId= res.body._id
    });
    // end INITIAL USER
});

after(function(done) {
    clearUser(done);
});

describe('User Test', function() {
    describe('POST /users/signin', function() {
        it('should send an object of user loggedin user with 200 status code', function(done) {
            const user = {
                email: 'lutfi@x.com',
                password: '1234'
            }
            
            chai
                .request(app)
                .post('/users/signin')
                .send(user)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('email');
                    expect(res.body).to.have.property('password');
                    expect(res.body.name).to.equal(`${userTest.name}`);
                    expect(res.body.email).to.equal(`${userTest.email}`);
                    expect(res.body.password).to.equal(`${userTest.password}`)
                    done();
                });
        })
    })
})