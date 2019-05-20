const express = require("express");
const usersRouter = require("./users");
const itemsRouter = require("./items");
// const { authentication }
const router = express.Router();

router.use("/api", usersRouter);
router.use("/api/items", itemsRouter);

module.exports = router;