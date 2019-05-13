const router = require("express").Router()
const product = require('./productRoutes')
const user = require("./userRoutes")

router.get("/", (req, res) => {
  res.status(200).json({ msg: 'connected' })
})

router.use("/products", product)
router.use("/users", user)

module.exports = router