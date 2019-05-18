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
      price: price,
      stock: stock,
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
    const { name, description, price, stock } = req.body

    if (!name || !price || !stock) {
      const err = {
        status: 400,
        message: 'Product validation failed: name or price or stock: required'
      }
      return next(err);
    }
    if(price < 0 || stock < 0) {
      const err = {
        status: 400,
        message: 'Product validation failed: price or stock: minimum 0'
      }
      return next(err);
    }

    let updatedProduct = req.product;
    let imageURL = null;
    
    if (req.file) {
      imageURL = req.file.cloudStoragePublicUrl;
    }
    updatedProduct.name = name;
    updatedProduct.description = description;
    updatedProduct.imageURL = imageURL || './assets/noPhoto.png';
    updatedProduct.price = price;
    updatedProduct.stock = stock;
    updatedProduct.updated = new Date();
    updatedProduct.updateOne({
      name, description, price, stock, imageURL: updatedProduct.imageURL, updated: updatedProduct.updated
    })
      .then(info => {
        res.status(201).json({ message: 'data updated', updatedProduct, info });
      })  
      .catch(err => {
        next(err);
      })
  }

  static updatePatch(req, res, next) {
    const { name, description, price, stock } = req.body

    if(price < 0 || stock < 0) {
      const err = {
        status: 400,
        message: 'Product validation failed: price or stock: minimum 0'
      }
      return next(err);
    }

    let { product } = req;
    let imageURL = null;
    
    if (req.file) {
      imageURL = req.file.cloudStoragePublicUrl;
    }
    product.name = name || product.name;
    product.description = description || product.description;
    product.imageURL = imageURL || product.imageURL;
    product.price = price || product.price;
    product.stock = stock || product.stock;
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