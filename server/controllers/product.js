const Product = require('../models/product');

class Controller {
  static findAll(req, res, next) {
    const { search } = req.query;
    let obj = {};

    if (search) {
      obj.title = search;
    }
    Product.find(obj, [], {
      sort: {
        updated: -1
      }
    })
      .then(products => {
        if (products.length === 0) {
          const err = {
            status: 404,
            message: 'data empty'
          }
          next(err);
        } else {
          res.status(200).json({ message: 'data found', products });
        }
      })
      .catch(err => {        
        next(err);
      })
  }

  static create(req, res, next) {
    const { name, description, price, stock } = req.body
    let imageURL = null;
    
    if (req.file) {
      imageURL = req.file.cloudStoragePublicUrl;
    }
    Product.create({
      name, description,
      price: price || 100,
      stock: stock || 0,
      imageURL: imageURL || './assets/noPhoto.png',
      created: new Date(),
      updated: new Date()
    })
      .then(newProduct => {
        res.status(201).json({ message: 'data created', newProduct });
      })
      .catch(err => {
        next(err);
      })
  }
  
  static findOne(req, res, next) {
    const { id } = req.params;
    Product.findById(id)
      .populate({
        path: 'creator',
        select: ['_id', 'name', 'email']
      })
      .then(product => {
        if (!product) {
          const err = {
            status: 404,
            message: 'data not found'
          }
          next(err);
        } else {
          res.status(200).json({ message: 'data found', product });
        }
      })
      .catch(err => {
        next(err);
      })
  }

  static updatePut(req, res, next) {
    const { title, text, status } = req.body
    let updatedProduct = req.product;
    let imageURL = null;
    
    if (req.file) {
      imageURL = req.file.cloudStoragePublicUrl;
    }
    updatedProduct.title = title;
    updatedProduct.text = text;
    updatedProduct.imageURL = imageURL;
    updatedProduct.status = status;
    updatedProduct.updated = new Date();
    updatedProduct.updateOne({
      title, text, status, imageURL, updated: updatedProduct.updated
    })
      .then(info => {
        res.status(201).json({ message: 'data updated', updatedProduct, info });
      })  
      .catch(err => {
        next(err);
      })
  }

  static updatePatch(req, res, next) {
    const { title, text, status } = req.body
    let { product } = req;
    let imageURL = null;
    
    if (req.file) {
      imageURL = req.file.cloudStoragePublicUrl;
    }
    product.title = title || product.title;
    product.text = text || product.text;
    product.imageURL = imageURL || product.imageURL;
    product.status = status || product.status;
    product.updated = new Date();
    product.save()
      .then(updatedProduct => {
        res.status(201).json({ message: 'data updated', updatedProduct });
      })  
      .catch(err => {
        next(err);
      })
  }

  static delete(req, res, next) {
    let { product } = req;
    product.delete()
      .then(deletedProduct => {
        res.status(200).json({ message: 'data deleted', deletedProduct });
      })  
      .catch(err => {
        next(err);
      })
  }
}


module.exports = Controller;