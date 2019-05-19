const Product = require('../models/product')

class ProductController {
    static findAll(req, res) {
        Product.find()
            .then(list => {
                res.status(200).json(list)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }
    static findOne(req, res) {
        Product.findOne({_id: req.params.id})
            .then(product => {
                res.status(200).json(product)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }
    static create(req, res) {
        console.log(req.body);

        let product = {}

        for(let key of Object.keys(req.body)) {
            if(key !== '_id') {
                product[key] = req.body[key]
            }
        }

        if(req.file) {
            product.image = req.file.cloudStoragePublicUrl
        }
        else {
            product.image = "https://storage.googleapis.com/miniwp-images/user.png"
        }

        Product.create(product)
            .then(newProd => {
                res.status(201).json(newProd)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }
    static delete(req, res) {
        Product.findOneAndDelete({_id: req.params.id})
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }
    static update(req, res) {
        if(req.file) {
            req.body.image = req.file.cloudStoragePublicUrl
        }
        Product.update({_id: req.params.id}, req.body, {new: true})
            .then(product => {
                res.status(200).json(product)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err.message)
            })
    }
    static search(req, res) {

        let findRegex = new RegExp(req.params.key, "i");
        console.log(findRegex);

        Product.find({ $or:[ {name: findRegex}, {description : findRegex} ]})
            .then(results => {
                res.status(200).json(results)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err.message)
            })
    }
}
module.exports = ProductController