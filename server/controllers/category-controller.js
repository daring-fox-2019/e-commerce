const Category = require('../models/category-model')

class CategoryController {

    static async showAll(req, res) {

        try {
            let newCategory = await Category.find().populate('products')
           
            res.status(200).json(newCategory)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async showLimit(req, res) {
        try {
            let categories = await Category.find({ _id : req.params.id}).populate('products')
            console.log(categories);
            res.status(200).json(categories)

        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }
}

module.exports = CategoryController