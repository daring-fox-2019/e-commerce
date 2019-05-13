const chai      = require('chai'),
      chaiHttp  = require('chai-http'),
      expect    = chai.expect,
      app       = require('../app')
      clearCart = require('../helpers/clearCart');

chai.use(chaiHttp);

let productId = ''
let userId = ''

const productToBuy = {
    name: 'Initial Data',
    price: 100000
};

const userTest = {
    name: 'lutfi',
    email: 'lutfi@x.com',
    password: '1234'
}

before(function(done) {
    clearCart(done)


    chai
        .request(app)
        .post('/products')
        .send(productToBuy)
        .end(function(err, res) {
            productId= res.body._id
    });

    chai
        .request(app)
        .post('/users/signup')
        .send(userTest)
        .end(function(err, res) {
            userId= res.body._id
    });
});

after(function(done) {
    clearCart(done);
});

describe('Cart Test', function() {
    describe('POST /carts/:productId', function() {
        it('should send an object of cart', function(done) {
            this.timeout(3000);
            const buyProduct = {
                name: productId,
                owner: userId
            }
            
            chai
                .request(app)
                .post(`/carts/${productId}`)
                .send(buyProduct)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        })
    })
})