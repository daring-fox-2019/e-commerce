const router = require(`express`).Router();

const user = require(`../controllers/user`);
const product = require(`../controllers/product`);
const cart = require(`../controllers/cart`);

const {
  authentication,
  authorization,
  adminAccess
} = require(`../middlewares/auth`);

const { sendUploadToGCS, multer } = require(`../middlewares/uploadtogcs`);
adminAccess;

router.post(`/register`, user.register); // request data { email, password } // response on success {id, name, email, password}
router.post(`/login`, user.login); // request data : {email, password} // response on success {id, name, email, token}

router.use(authentication);
router.post(`/cart`, cart.post);
router.get(`/carts`, cart.carts);

router.get(`/cart/:id`, authorization, cart.detail); // request headers : token // response on success [{},{}]
router.delete(`/cart/:id`, authorization, cart.delete);
router.update(`/cart/:id`, authorization, cart.update);

router.get(`/products`, product.products);
router.post(`/product`, adminAccess, product.create);

router.get(`/product/:id`, product.detail); // request headers : token // response on success [{},{}]
router.delete(`/product/:id`, adminAccess, product.delete);
router.update(`/product/:id`, product.update);

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
