const route = require("express").Router();
const { ProductController } = require("../controllers");
const { Authentication, ProductAuthorization } = require("../middlewares/authentication");
const { 
  getPublicUrl,
  sendUploadToGCS,
  multer
} = require('../middlewares/images');
// route.use(Authentication)
route.post("/", ProductController.create);
route.get("/", ProductController.findAll);
route.get("/one", ProductController.findOne);
route.delete("/:id", ProductAuthorization, ProductController.delete);
route.patch('/:id', ProductAuthorization, ProductController.update);
route.post("/upload", multer.single('file'),sendUploadToGCS, ProductController.upload)
route.get('/search', ProductController.search)
module.exports = route;
