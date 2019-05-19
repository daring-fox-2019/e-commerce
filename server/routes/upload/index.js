const express = require("express"),
  router = express.Router(),
  Multer = require("multer"),
  gcsMiddlewares = require("../../middlewares/google-cloud-storage");
  googleVision = require('../../middlewares/googleVison')

const { authenticate } = require('../../middlewares/auth')

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024 // Maximum file size is 10MB
  }
});

router.post("/", authenticate, multer.single("file"), gcsMiddlewares.sendUploadToGCS, googleVision, (req, res, next) => {
    if (req.file && req.file.gcsUrl) {
      res.status(200).json({ labels: req.file.labels, url: req.file.gcsUrl })
    } else {
      next({ message: 'problem upload photo' })
    }
  }
);

module.exports = router;