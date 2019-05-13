const Product = require('../models/product-model')

class ProductController {

    static async create(req, res) {
        try {
            
            let newProduct = await Product.create(req.body)
            res.status(201).json(newProduct)
        } catch (error) {
            res.status(500).json(error)
        }

    }

    static async showAll(req, res) {
        try {
            let allProduct = await Product.find({})
            if (allProduct) {
                res.status(200).json(allProduct)
            } else {
                res.status(400).json({message : 'Not Found'})
            }
        } catch (error) {
            res.status(500).json(error)
        }

    }

    static async delete(req, res) {
        try {
           
            let deleted = await Product.findByIdAndDelete(req.params.id)
            if (deleted) {
                res.status(200).json({deleted, message : 'Successfully delete product'})
            } else {
                res.status(404).json({message : 'not found'})
            }
        } catch (error) {
            if (error.errors) {
                res.status(400).json(error)
            } else {
                res.status(500).json(error)
            }
        }
    }

    static async update(req, res) {
      
        try {
            let updated = await Product.findByIdAndUpdate(req.params.id, { $set : {...req.body}},{runValidators:true, new:true})
          
            if (updated) {
                res.status(200).json({updated, message : 'Successfully update data'})
            } else {
                res.status(404).json({message : 'not found'})
            }
        } catch (error) {
            if (error.errors) {
                res.status(400).json(error)
            } else {
                res.status(500).json(error)
            }
        }
    }

    static async showOne(req, res) {
        
        try {
            let product = await Product.findOne({_id : req.params.id})
                res.status(200).json(product)
        } catch (error) {
            if (error.errors) {
                res.status(400).json(error)
            } else {
                res.status(500).json(error)
            }
        }
    }
}

module.exports = ProductController