const { Product } = require("../models");
const {
  hashPass,
  generateJWT,
  compareHash,
  decodeJWT
} = require("../helpers/helper");

class ProductController {
  static create(req, res) {
    let decode = decodeJWT(req.headers.token);
    let newProduct = new Product({
      image: req.body.image,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      sellerId: decode.id,
      stock: req.body.stock,
      category: req.body.category
    });
    newProduct
      .save()
      .then(created => {
        res.status(201).json(created);
      })
      .catch(err => {
        res.status(500).json({
          msg: err.message
        });
      });
  }
  static findAll(req, res) {
    Product.find(req.query)
      .sort("-createdAt")
      .then(products => {
        res.status(200).json(products);
      })
      .catch(err => {
        res.status(500).json({
          msg: err.message
        });
      });
  }
  static update(req, res) {
    let obj = {};
    for (let key in req.body) {
      obj[key] = req.body[key];
    }
    Product.findByIdAndUpdate(req.params.id, obj, { new: true })
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(err => {
        res.status(500).json({
          msg: err.message
        });
      });
  }

  static delete(req, res) {
    Product.findByIdAndDelete(req.params.id)
      .then(deleted => {
        res.status(200).json(deleted);
      })
      .catch(err => {
        res.status(500).json({
          msg: err.message
        });
      });
  }
  static findOne(req, res) {
    Product.findById(req.query.id)
      .then(product => {
        res.status(200).json(product);
      })
      .catch(err => {
        res.status(500).json({
          msg: err.message
        });
      });
  }
  static upload(req, res) {
    console.log("UPLOADING");
    const image_data = { imageUrl: req.file.url };
    res.status(200).json(image_data);
  }
  static search(req, res) {
    let { title } = req.query;
    let obj = {};
    if (title) {
      title = new RegExp(`.*${title}.*`, "i");
      obj = { $or: [{ title: title }] };
      Product.find(obj)
        .then(data => {
          res.status(200).json(data);
        })
        .catch(err => {
          res.status(500).json({
            msg: err.message
          });
        });
    }else{
      res.status(200).json([])
    }
  }
}

module.exports = ProductController;
