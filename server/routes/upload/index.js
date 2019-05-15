const express = require("express"),
  router = express.Router(),
  Multer = require("multer"),
  gcsMiddlewares = require("../../middlewares/google-cloud-storage");

const { authenticate } = require('../../middlewares/auth')

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024 // Maximum file size is 10MB
  }
});

router.post("/", authenticate, multer.single("file"), gcsMiddlewares.sendUploadToGCS, (req, res, next) => {
    if (req.file && req.file.gcsUrl) {
      const link = req.file.gcsUrl
      //console.log(link,'======================================')
      res.send(link);
    }
  }
);

module.exports = router;