const models = require('../../models')
const FakeUser = require('./models').User
const FakeItem = require('./models').Item

const createUser = () => {
  let fakeUser = new FakeUser()
  return models.User
    .create(fakeUser)
    .then(user => {
      user.rawPassword = fakeUser.password
      return user
    })
}

const createItem = (user) => {
  let fakeItem = new FakeItem()
  fakeItem.seller = user.id
  return models.Item
    .create(fakeItem)
}

const createTransaction = (user) => {
  let items = new Set(user.cart.map(itemId => String(itemId)))

  return models.Transaction
    .create({
      owner: user._id,
      cart: Array.from(items).map(item => ({
        item,
        count: user.cart.filter(itemId => itemId.equals(item)).length
      }))
    })
}

const clearDb = (...modelsName) => done => {
  Promise.all(
    modelsName.map(modelName => models[modelName].deleteMany({}))
  )
    .then(() => done())
    .catch(done)
}

module.exports = { createUser, createItem, clearDb, createTransaction }
