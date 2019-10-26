const chai = require('chai')
const chaihttp = require('chai-http')
const { expect } = chai
const app = require('../app')
const { Product } = require('../models')

chai.use(chaihttp)

describe('Route Error:', (done) => {
  it('Should return status 404 with object message \'Not Found :(\'', (done) => {
    chai
      .request(app)
      .get('/wakwaw')
      .then(res => {
        expect(res).to.have.status(404)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.be.a('string')
        expect(res.body.message).to.be.equal('Not Found :(')
        done()
      })
      .catch(err => {
        console.log({ err })
      })
  })
})