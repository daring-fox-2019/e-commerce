const faker = require('faker')

const User = function () {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}

const Item = function () {
  return {
    name: faker.commerce.productName(),
    imageUrl: 'image.png',
    stock: Math.floor(Math.random() * 100),
    price: 1000000 + Math.floor(Math.random() * 100000000)
  }
}

module.exports = { User, Item }
