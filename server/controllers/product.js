const Product = require('../models/product');
const { ObjectId } = require('mongoose').Types;

class ProductController {
    static addProduct(req, res, next) {
        let obj = {
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock
        }

        if (req.file) {
            obj.image = req.file.cloudStoragePublicUrl
        }

        Product
            .create(obj)
            .then(newProduct => {
                res
                    .status(201)
                    .json(newProduct);
            })
            .catch(err => {
                if (RegExp('validation').test(err.message)) {
                    res
                        .status(403)
                        .json({
                            message: err.message
                        })
                } else {
                    next(err);
                }
            });
    };

    static listProduct(req, res, next) {
        Product
            .find({})
            .then(products => {
                res
                    .status(200)
                    .json(products);
            })
            .catch(err => {
                next(err)
            });
    };

    static detailProduct(req, res, next) {
        Product
            .findById(req.params.id)
            .then(product => {
                if (product) {
                    res
                        .status(200)
                        .json(product);
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'Product not found'
                        });
                };
            })
            .catch(err => {
                next(err)
            });
    };

    static updateProduct(req, res, next) {
        Product
            .updateOne({
                _id: ObjectId(req.params.id)
            }, {
                    $set: req.body
                })
            .then(result => {
                if (result.n && result.ok) {
                    res
                        .status(200)
                        .json(result)
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'Product not found'
                        })
                }
            })
            .catch(err => {
                next(err);
            });
    };

    static deleteProduct(req, res, next) {
        Product
            .deleteOne({
                _id: req.params.id
            })
            .then(result => {
                if (result.n && result.ok) {
                    res
                        .status(200)
                        .json(result)
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'Product not found'
                        })
                }
            })
            .catch(err => {
                if (RegExp('Cast to ObjectId failed').test(err.message)) {
                    res
                        .status(404)
                        .json({
                            message: err.message
                        })
                } else {
                    next(err)
                }
            });
    };
};

module.exports = ProductController;