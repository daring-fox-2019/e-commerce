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
router.get(`/products`, product.products);

router.use(authentication);
router.put(`/user/:id`, authentication, user.update);
router.get(`/user/:id`, authentication, user.detail);
router.post(`/cart`, cart.create);

router.get(`/carts`, cart.carts);
router.get(`/cart/:id`, cart.detail);
router.put(`/cart/:id`, cart.update);

router.delete(`/cart/:id`, authorization, cart.delete);


router.get(`/product/:id`, product.detail);
router.put(`/product/:id`, product.update);


router.post(
  `/uploadimg`,
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

router.post(`/product`, adminAccess, product.create);
router.delete(`/product/:id`, adminAccess, product.delete);
  
module.exports = router;
