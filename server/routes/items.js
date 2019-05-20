const express = require("express");
const ItemController = require("../controllers/item-controller");
const { authentication, authorization } = require("../middlewares/auth");
const { sendUploadToGCS, multer } = require("../middlewares/multer");
const router = express.Router();

router.get("/", ItemController.getItems);
router.get("/:id", ItemController.getItem);
router.post("/", authentication, multer.single("image"), sendUploadToGCS, ItemController.createItem);
router.put("/:id", authentication, authorization, ItemController.updateItem);
router.delete("/:id", authentication, authorization, ItemController.deleteItem);

module.exports = router;