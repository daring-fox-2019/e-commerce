const Product = require('../models/product')

class ProductController {
    static findAll(req, res) {
        Product
        .find({})
        .then(function (products) {
            res.status(200).json(products);
        })
        .catch(function (err) {
            res.status(400).json({
                message: 'Internal server error',
                err
            });
        });
    }

    static findOne(req, res) {
        const id = req.params.id

        Product
        .findById(id)
        .then(product => {
            res.status(200).json(product)
        })
        .catch(err => {
            res.status(400).json({
                message: 'Internal server error',
                err
            });
        })
    }

    static findByCategory(req,res) {
        const categories = ['cereal', 'shirt', 'aqiqah', 'birthday']
        
        if(categories.includes(req.query.category)) {
            Product
            .find({
                category: req.query.category
            })
            .then(product => {
                console.log(product);
                res.status(200).json(product)
            })
            .catch(err => {
                res.status(400).json({
                    message: 'Internal server error',
                    err
                });
            })
        }
    }

    static create(req, res) {
        const { name, price, stock, category, description } = req.body
        const picture = req.file.cloudStoragePublicUrl

        Product
        .create({
            name,
            price,
            stock,
            category,
            description,
            picture
        })
        .then(function (product) {
            res.status(201).json(product);
        })
        .catch(function (err) {
            console.log(err);
            res.status(400).json({
                message: 'Internal server error',
                err
            });
        });
    }

    static update(req, res) {
        const { name, price, stock, category, description } = req.body
        let picture=''
        if(!req.file) {
            picture = req.body.picture
        }else {
            picture = req.file.cloudStoragePublicUrl
        }

        Product
        .findByIdAndUpdate(req.params.id, {
            name,
            price,
            stock,
            category,
            description,
            picture
        }, {new:true})
        .then(function (product) {
            res.status(201).json(product);
        })
        .catch(function (err) {
            res.status(500).json({
                message: 'Internal server error',
                err
            });
        });
    }

    static delete(req, res) {
        // console.log(req.params.id);
        Product
        .findByIdAndDelete(req.params.id)
        .then(function (product) {
            res.status(200).json(product);
        })
        .catch(function (err) {
            res.status(500).json({
                message: 'Internal server error',
                err
            });
        });
    }
}

module.exports = ProductController
