const { Item } = require('../models')

class ControllerItem {
    static create(req,res) {
        let { title, mainPage, kategori, description, price, stock } = req.body
        Item.create({
            title,
            description,
            price,
            mainPage,
            kategori,
            stock,
            image : req.file.cloudStoragePublicUrl
        })
        .then(data =>{
            res.status(201).json(data)
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    }
    static findAll(req,res) {
        Item.find()
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    }
    static findOne(req,res) {
        let { id } = req.params
        Item.findOne({ _id : id})
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    }
    static update(req,res) {
        let input = req.body
        let newItem
        if(req.file){
            newItem = {
                title: input.title,
                description: input.description,
                price : input.price,
                kategori : input.kategori,
                mainPage : input.mainPage,
                stock : input.stock,
                image: req.file.cloudStoragePublicUrl
            }
        }else {
            newItem = {
                title: input.title,
                description: input.description,
                price : input.price,
                kategori : input.kategori,
                mainPage : input.mainPage,
                stock : input.stock,
            }
        }
        let { id } = req.params.id
        Item.findOneAndUpdate({_id : id}, newItem, { new: true })
        .then(() =>{
            res.status(200).json({
                message : 'Update succesfully'
            })
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    }
    static delete(req,res) {
        let { id } = req.params
        Item.deleteOne({_id : id})
        .then(() =>{
            res.status(200).json({
                message : "delete succesfully"
            })
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    }
}
module.exports = ControllerItem