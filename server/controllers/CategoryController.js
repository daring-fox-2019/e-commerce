const Category = require('../models/category')
const Product= require('../models/product')

class CategoryController {

    static async create (req, res) {
        try {
           let newcat = await Category.create({...req.body})
           res.status(201).json(newcat) 
        } catch (error) {
            console.log(error);
            
            if (error.errors) res.status(400).json(error)
            else res.status(500).json(error)
        }
    }

    static async findAll(req,res) {
        try {
            let all = await Category.find().populate('products')
            console.log(all, 'HALO???');
            
            res.status(200).json(all)
        } catch (error) {
            if (error.errors) res.status(400).json(error)
            else res.status(500).json(error)
        }
    }

    static async findOne(req,res) {
        try {
            let all = await Category.findById(req.params.id)
            res.status(200).json(all)
        } catch (error) {
            if (error.errors) res.status(400).json(error)
            else res.status(500).json(error)
        }
    }

    static async delete(req, res) {
        try {
           let delcat = await Category.findByIdAndDelete(req.params.id)
           if (delcat) res.status(200).json(delcat)
           else  res.status(404).json({msg : 'No such category'})
        } catch (error) {
            if (error.errors) res.status(400).json(error)
            else res.status(500).json(error)
        }
    }

    static async update(req, res) {
        try {
           let upcat = await Category.findByIdAndUpdate(req.params.id, {$set : {...req.body}}, {runValidators : true, new : true})
           if (upcat) res.status(200).json(upcat)
           else  res.status(404).json({msg : 'No such category'})
        } catch (error) {
            if (error.errors) res.status(400).json(error)
            else res.status(500).json(error)
        }
    }
}


module.exports = CategoryController