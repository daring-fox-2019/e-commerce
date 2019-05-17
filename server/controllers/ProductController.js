const Product = require('../models/product')
const Category = require('../models/category')

class ProductController {

    static async create(req, res) {
        try {
            console.log(req.files, 'UDAH DAPAjhASJHasjhaST YA ??');
            let urls = []
            if (req.files) {
                req.files.forEach(img => {
                    urls.push(img.cloudStoragePublicUrl)
                })
                let created = await Product.create({...req.body, image : urls})
                console.log(created._id);
                
                await Category.findByIdAndUpdate(req.body.category, {$push : {products : created._id}})
                res.status(201).json(created)
                // res.status(200).json(req.files)
            } else {
                let created = await Product.create({...req.body, image : urls})
            }
        } catch (error) {                        
            if (error.errors) res.status(400).json(error)
            else {
                res.status(500).json(error)
            }            
        }
    }

    static async findAll(req, res) {
        try {
            console.log('hii mau cari semua barang');
           let found = await Product.find({}).populate('category')
           res.status(200).json(found) 
           console.log('apa temuan', found);
           
        } catch (error) {
            if (error.errors) res.status(400).json(error)
            else {
                res.status(500).json(error)
            } 
        }
    }

    static async findOne(req, res) {
        try {
           let found = await Product.findById(req.params.id)
           if (found) res.status(200).json(found)
           else res.status(404).json({msg : 'Product not found'})       
        } catch (error) {
            if (error.errors) res.status(400).json(error)
            else {
                res.status(500).json(error)
            } 
        }
    }

    static async delete (req, res) {
        try {
            let deleted = await Product.findByIdAndDelete(req.params.id)
            if (deleted) res.status(200).json(deleted)     
            else res.status(404).json({msg : 'Product not found'})       
        } catch (error) {
            if (error.errors) res.status(400).json(error)
            else {
                res.status(500).json(error)
            } 
        }
    }

    static async update(req, res) {
        try {
            let url = req.file ? req.file.cloudStoragePublicUrl : req.body.image;
            let updated = await Product.findByIdAndUpdate(req.params.id, {$set : {...req.body, image : url}}, {useFindAndModify : false, runValidators: true, new : true})
            if (updated) res.status(200).json(updated)
            else res.status(404).json({msg : 'Product not found'})       
        } catch (error) {
            
            if (error.errors) res.status(400).json(error)
            else {
                res.status(500).json(error)
            }
             
        }
    }

}

module.exports = ProductController