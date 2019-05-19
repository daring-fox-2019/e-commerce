const router = require(`express`).Router();

const user = require("../controllers/userc");
const product = require(`../controllers/productc`);
const cart = require("../controllers/cartc");

const {
  authentication,
  authorization,
  adminAccess
} = require(`../middlewares/auth`);

const { sendUploadToGCS, multer } = require(`../middlewares/uploadtogcs`);

router.post("/register", user.register);
router.post(`/login`, user.login);
router.put(`/user/:id`, user.update);

router.use(authentication);
router.post(`/cart`, cart.create);
router.get(`/carts`, cart.carts);

router.get(`/cart/:id`, authorization, cart.detail);
router.delete(`/cart/:id`, authorization, cart.delete);
router.put(`/cart/:id`, authorization, cart.update);

router.get(`/products`, product.products);
router.post(`/product`, adminAccess, product.create);

router.get(`/product/:id`, product.detail);
router.delete(`/product/:id`, adminAccess, product.delete);
router.put(`/product/:id`, product.update);

router.post(
  `/uploadimg`,
  adminAccess,
  multer.single(`image`),
  sendUploadToGCS,
  (req, res) => {
    if (req.file) {
      res.status(200).json(req.file.cloudStoragePublicUrl);
    } else {
      res.status(500).send(`Unable to upload`);
    }
  }
);

module.exports = router;
