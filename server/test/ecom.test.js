const chai = require('chai');
const chaiHttp = require('chai-http')
const expect = chai.expect;
const assert = require('assert')
// const app = require('../app')
const baseURL = `localhost:3000`
chai.use(chaiHttp)

// const requester = chai.request(app).keepOpen()
let prod

//create then read then patch then delete
describe(`ecommerce process`, function () {
    let credential, otherCredential;
    let newUser = { name: `ilman`, email: 'testman@sam.sam', password: '123456' }
    let otherNewUser = { name: `antiIlman`, email: 'antiman@sam.sam', password: '123456' }
    let newProduct = { name: "toothbrush X", price: 10000, quantity: 13 }
    let newProducts = [
        { name: "toothbrush A", price: 12000, quantity: 13 },
        { name: "toothbrush B", price: 13000, quantity: 12 },
        { name: "toothbrush C", price: 14000, quantity: 11 },
        { name: "toothbrush D", price: 15000, quantity: 10 }
    ]

    it(`backend should be able at least to say hello`, async function () {
        let response = await chai.request(baseURL)
            .get('/hello')
        expect(response.statusCode).to.equal(200)
        expect(response.body).to.deep.equal({ msg: `hello world` })
    })

    it(`register as a new user`, async function () {
        let response = await chai.request(baseURL)
            .post('/auth/register')
            .send(newUser)
        // credential = response.body
        expect(response.statusCode).to.equal(201)
        expect(response.body).to.be.an('object')
    })

    it(`should be able to log in as previously created  new user`, async function () {
        let response = await chai.request(baseURL)
            .post('/auth/login')
            .send(newUser)

        expect(response.statusCode).to.equal(201)
        expect(response.body).to.be.an('object')
        expect(response.body).to.have.property('token')
        expect(response.body).to.have.property('user')
        expect(response.body).to.not.have.nested.property('user.password')

        credential = response.body
    })

    it(`new user should be able to register a new product / products`, async function () {
        for (product of newProducts) {
            let response = await chai.request(baseURL)
                .post(`/product`)
                .set('token', credential.token)
                .send(prod)
            expect(response.statusCode).to.equal(201)
            expect(response.body).to.be.an('object')
        }
    })

    it(`new user should be able to put products to cart`, async function () {
        let response = await chai.request(baseURL)
            .post(`/cart/:id`)
            .set('token', credential.token)
            .send(newProduct)
        expect(response.statusCode).to.equal(201)
        expect(response.body).to.be.an('object')
    })

    it(`new user should be able to remove a product from cart`, async function () {
        let response = await chai.request(baseURL)
            .delete(`/cart/:id`)
            .set('token', credential.token)
            .send(newProduct)
        expect(response.statusCode).to.equal(204)
        expect(response.body).to.be.an('object')
    })

    it(`new user should be able to edit his own product `, async function () {
        let response = await chai.request(baseURL)
            .post(`/product`)
            .set('token', credential.token)
            .send(newProduct)
        expect(response.statusCode).to.equal(200)
        expect(response.body).to.be.an('object')
    })

    it(`new user should be able to remove his own product`, async function () {
        let response = await chai.request(baseURL)
            .post(`/product`)
            .set('token', credential.token)
            .send(newProduct)
        expect(response.statusCode).to.equal(200)
        expect(response.body).to.be.an('object')
    })

    it(`new user should be able to edit his own account`, async function () {
        let response = await chai.request(baseURL)
            .patch(`/user`)
            .set('token', credential.token)
            .send(newProduct)
        expect(response.statusCode).to.equal(200)
        expect(response.body).to.be.an('object')
    })

    it(`new user should be able to destroy his own account`, async function () {
        let response = await chai.request(baseURL)
            .delete(`/user`)
            .set('token', credential.token)
            .send(newProduct)
        expect(response.statusCode).to.equal(200)
        expect(response.body).to.be.an('object')
    })
})

// requester.close()