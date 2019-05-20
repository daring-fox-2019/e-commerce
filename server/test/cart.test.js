const chai      = require('chai'),
      chaiHttp  = require('chai-http'),
      expect    = chai.expect,
      app       = require('../app')
      clearCart = require('../helpers/clearCart');
      clearUser = require('../helpers/clearUser');

chai.use(chaiHttp);

let productId = ''
let userId = ''

const productToBuy = {
    name: 'Nike Air',
    price: 100000
};

const userTest = {
    name: 'lutfi',
    email: 'lutfi@dummy.com',
    password: '1234'
}

let authUser = {}

before(function(done) {
    clearCart(done)

    chai
        .request(app)
        .post('/products')
        .send(productToBuy)
        .end()

    chai
        .request(app)
        .post('/users/signup')
        .send(userTest)
        .end(function(err,res) {
            registeredUser=res.body
        })
    
    chai
        .request(app)
        .post('/users/signin')
        .send({
            email: userTest.email, 
            password: userTest.password
        })
        .end(function(err, res) {
            expect(err).to.be.null;
            authUser= res.body
        });
});


after(function(done) {
    clearCart(done);
});

// after(function(done) {
    // clearUser(done);
// });

describe('Cart Test', function() {
    
    describe('POST /cart', function() {
        it('should send an object of cart', function(done) {
            const buyProduct = {
                name: productId,
                owner: userId
            }
            
            chai
                .request(app)
                .post(`/carts`)
                .set('token', authUser.token)
                .send(buyProduct)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    done();
                });
        })
    })
})