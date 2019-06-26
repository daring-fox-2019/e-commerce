require('iconv-lite/encodings') // somehow need to require this before mock-fs

const fs = require('fs')
const mongoose = require('mongoose')
const mock = require('mock-fs')
const chai = require('chai')
const chaiHttp = require('chai-http')
const dirtyChai = require('dirty-chai')

const app = require('../app')
const { Item } = require('./helpers/models')
const { createUser, createItem, clearDb } = require('./helpers/db')
const { createToken } = require('./helpers/auth')

const expect = chai.expect

chai.use(chaiHttp)
chai.use(dirtyChai)

describe('Items Tests', function () {
  before(function (done) {
    createUser()
      .then(user => {
        this.user = user
        this.user.token = createToken(user)
        return createItem(this.user)
      })
      .then(item => {
        this.item = item
        done()
      })
      .catch(done)
  })
  before(function (done) {
    createUser()
      .then(user => {
        this.otherUser = user
        this.otherUser.token = createToken(user)
        done()
      })
      .catch(done)
  })
  before(function (done) {
    this.image = {
      path: './images/image.png',
      filename: 'image.png'
    }
    mock({ [this.image.path]: Buffer.from([1]) })
    done()
  })
  after(mock.restore)
  after(clearDb('User', 'Item'))

  describe('GET /items', function () {
    it('should send 200 status code', function (done) {
      chai
        .request(app)
        .get('/items')
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(200)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('items')

          let { items } = body
          expect(items).to.be.an('array')
          expect(items).to.have.lengthOf(1)

          expect(items[0]).to.be.an('object')
          expect(items[0]).to.have.property('_id')
          expect(items[0]).to.have.property('name')
          expect(items[0]).to.have.property('imageUrl')
          expect(items[0]).to.have.property('stock')
          expect(items[0]).to.have.property('price')
          expect(items[0]).to.have.property('seller')

          let { seller } = items[0]
          expect(seller).to.be.an('object')
          expect(seller).to.have.property('_id')
          expect(seller).to.have.property('email')
          expect(seller).to.not.have.property('password')

          done()
        })
    })
  })

  describe('GET /items/:item_id', function () {
    it('should send 200 status code', function (done) {
      chai
        .request(app)
        .get(`/items/${this.item.id}`)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(200)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('item')

          let { item } = body
          expect(item).to.be.an('object')
          expect(item).to.have.property('_id')
          expect(item).to.have.property('name')
          expect(item).to.have.property('imageUrl')
          expect(item).to.have.property('stock')
          expect(item).to.have.property('price')
          expect(item).to.have.property('seller')

          let { seller } = item
          expect(seller).to.be.an('object')
          expect(seller).to.have.property('_id')
          expect(seller).to.have.property('email')
          expect(seller).to.not.have.property('password')

          done()
        })
    })

    it('should send 404 status code when item can\'t be found', function (done) {
      chai
        .request(app)
        .get(`/items/${mongoose.Types.ObjectId()}`)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(404)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('message')
          expect(body.message).to.equal('Item Not Found')

          done()
        })
    })
  })

  describe('POST /items', function () {
    let { name, stock, price } = new Item()

    it('should send 201 status code', function (done) {
      chai
        .request(app)
        .post('/items')
        .field('name', name)
        .field('stock', stock)
        .field('price', price)
        .attach('image', fs.readFileSync(this.image.path), this.image.filename)
        .set('Authorization', this.user.token)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(201)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('item')

          let { item } = body
          expect(item).to.be.an('object')
          expect(item).to.have.property('name')
          expect(item).to.have.property('imageUrl')
          expect(item).to.have.property('stock')
          expect(item).to.have.property('price')
          expect(item).to.have.property('seller')
          expect(item.name).to.equal(name)
          expect(item.imageUrl).to.equal(this.image.filename)
          expect(item.stock).to.equal(stock)
          expect(item.price).to.equal(price)

          let { seller } = item
          expect(seller).to.be.an('object')
          expect(seller).to.have.property('_id')
          expect(seller).to.have.property('email')
          expect(seller).to.not.have.property('password')

          done()
        })
    })

    it('should send 400 status code when unauthenticated user trying to create an item', function (done) {
      chai
        .request(app)
        .post('/items')
        .field('name', name)
        .field('stock', stock)
        .field('price', price)
        .attach('image', fs.readFileSync(this.image.path), this.image.filename)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(400)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('message')
          expect(body.message).to.equal('Missing Token')

          done()
        })
    })

    it('should send 422 status code creating an item with empty name', function (done) {
      chai
        .request(app)
        .post('/items')
        .field('name', '')
        .field('stock', stock)
        .field('price', price)
        .attach('image', fs.readFileSync(this.image.path), this.image.filename)
        .set('Authorization', this.user.token)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(422)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('message')
          expect(body.message).to.equal('Item name can\'t be empty')

          done()
        })
    })
  })

  describe('PUT /items/:item_id', function () {
    let { name, stock, price } = new Item()

    it('should send 200 status code', function (done) {
      chai
        .request(app)
        .put(`/items/${this.item.id}`)
        .field('name', name)
        .field('stock', stock)
        .field('price', price)
        .attach('image', fs.readFileSync(this.image.path), this.image.filename)
        .set('Authorization', this.user.token)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(200)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('item')

          let { item } = body
          expect(item).to.be.an('object')
          expect(item).to.have.property('_id')
          expect(item).to.have.property('name')
          expect(item).to.have.property('imageUrl')
          expect(item).to.have.property('stock')
          expect(item).to.have.property('price')
          expect(item).to.have.property('seller')
          expect(item._id).to.equal(this.item.id)
          expect(item.name).to.equal(name)
          expect(item.imageUrl).to.equal(this.image.filename)
          expect(item.stock).to.equal(stock)
          expect(item.price).to.equal(price)

          let { seller } = item
          expect(seller).to.be.an('object')
          expect(seller).to.have.property('_id')
          expect(seller).to.have.property('email')
          expect(seller).to.not.have.property('password')

          done()
        })
    })

    it('should send 400 status code when unauthenticated user trying to update an item', function (done) {
      chai
        .request(app)
        .put(`/items/${this.item.id}`)
        .field('name', name)
        .field('stock', stock)
        .field('price', price)
        .attach('image', fs.readFileSync(this.image.path), this.image.filename)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(400)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('message')
          expect(body.message).to.equal('Missing Token')

          done()
        })
    })

    it('should send 401 status code updating an item not using seller account', function (done) {
      chai
        .request(app)
        .put(`/items/${this.item.id}`)
        .field('name', name)
        .field('stock', stock)
        .field('price', price)
        .attach('image', fs.readFileSync(this.image.path), this.image.filename)
        .set('Authorization', this.otherUser.token)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(401)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('message')
          expect(body.message).to.equal('Unauthorized Access')

          done()
        })
    })

    it('should send 404 status code updating non exist item', function (done) {
      chai
        .request(app)
        .put(`/items/${mongoose.Types.ObjectId()}`)
        .field('name', name)
        .field('stock', stock)
        .field('price', price)
        .attach('image', fs.readFileSync(this.image.path), this.image.filename)
        .set('Authorization', this.user.token)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(404)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('message')
          expect(body.message).to.equal('Item Not Found')

          done()
        })
    })

    it('should send 422 status code emptying item name', function (done) {
      chai
        .request(app)
        .put(`/items/${this.item.id}`)
        .field('name', '')
        .field('stock', stock)
        .field('price', price)
        .attach('image', fs.readFileSync(this.image.path), this.image.filename)
        .set('Authorization', this.user.token)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(422)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('message')
          expect(body.message).to.equal('Item name can\'t be empty')

          done()
        })
    })
  })

  describe('DELETE /items/:item_id', function () {
    it('should send 200 status code', function (done) {
      chai
        .request(app)
        .delete(`/items/${this.item.id}`)
        .set('Authorization', this.user.token)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(200)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('item')

          let { item } = body
          expect(item).to.be.an('object')
          expect(item).to.have.property('_id')
          expect(item._id).to.equal(this.item.id)

          createItem(this.user)
            .then(item => {
              this.item = item
              done()
            })
            .catch(done)
        })
    })

    it('should send 400 status code when unauthenticated user trying to delete an item', function (done) {
      chai
        .request(app)
        .delete(`/items/${this.item.id}`)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(400)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('message')
          expect(body.message).to.equal('Missing Token')

          done()
        })
    })

    it('should send 401 status code when deleting an item not using seller account', function (done) {
      chai
        .request(app)
        .delete(`/items/${this.item.id}`)
        .set('Authorization', this.otherUser.token)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(401)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('message')
          expect(body.message).to.equal('Unauthorized Access')

          done()
        })
    })

    it('should send 404 status code deleting non exist item', function (done) {
      chai
        .request(app)
        .delete(`/items/${mongoose.Types.ObjectId()}`)
        .set('Authorization', this.user.token)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(404)

          let { body } = res
          expect(body).to.be.an('object')
          expect(body).to.have.property('message')
          expect(body.message).to.equal('Item Not Found')

          done()
        })
    })
  })
})
