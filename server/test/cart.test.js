const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const User = require('../models/user');
const Product = require('../models/product');
const {
    clearAll
} = require('../helpers/clearDb');
const { sign } = require('../helpers');

chai.use(chaiHttp)

let token = null
let adminToken = null
let prodId1 = null
let prodId2 = null

before(function(done) {
    const arr = [
        User
            .create({
                name: 'Budi',
                email: 'budi@email.com',
                password: 'budi'
            }),
        User
            .create({
                name: 'Admin2',
                email: 'admin2@warung.com',
                password: 'admin2',
                role: 'Admin'
            }),
        Product
            .create({
                name: 'Rubik',
                price: 20000,
                stock: 15
            }),
        Product
            .create({
                name: 'Catur',
                price: 50000,
                stock: 10
            })
    ]

    Promise
        .all(arr)
        .then(([user, admin, prod1, prod2]) => {
            token = sign(user._id, user.name, user.role)
            adminToken = sign(admin._id, admin.name, admin.role)
            prodId1 = prod1._id
            prodId2 = prod2._id
            
            clearAll(done)
        })
        .catch(err => {
            console.log(err)
        })
});

after(function(done) {
    clearAll(done)
});
