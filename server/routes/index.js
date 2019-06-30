const router = require("express").Router()
const product = require('./productRoutes')
const user = require("./userRoutes")
const cart = require("./cartRoutes")

router.get("/", (req, res) => {
  res.status(200).json({ msg: 'connected' })
})

router.use("/products", product)
router.use("/users", user)
router.use("/cart",cart)
module.exports = router