const chai      = require('chai'),
      chaiHttp  = require('chai-http'),
      expect    = chai.expect,
      app       = require('../app'),
      ProductModel = require('../models/product'),
      UserModel = require('../models/user')
      clearProduct = require('./helper/clearProduct'),
      clearUser = require('./helper/clearUser'),
{ tokenGenerator } = require('../helper/jwt')


chai.use(chaiHttp)

let productDummy = {}
let tokenAdmin = null
let tokenUser = null

