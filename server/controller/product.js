const { wrapAsync, givesError } = require('../helpers')
const Product = require('../models/product')
const { deleteFromBucket } = require('../helpers/image-utility')
const logz = k => { console.log(`~~~~~logz~~~~~~~`); console.log(k); console.log(`~~~~~~~~~~~~~~~~~~~`) }


const functions = {
    GetProductHome: wrapAsync(async function (req, res) {
        let search = {}
        let skip = 0,limit = 0
        let products = await Product.find(search)        
        res.json(products);        
    }),
    Get: wrapAsync(async function (req, res) {
        let search = {}
        let products = await Product.find(search)        
        res.json(products);        
    }),
    GetOne: wrapAsync(async function (req, res) {
        let product = await Product.findById(req.params.id)
        if (product) res.json(product)
        else res.status(404).json({msg:`bad request, while trying to get one product check the id: ${req.params.id}`})
    }),
    Post: wrapAsync(async function (req, res) {
        
        let newProduct = { ...req.body}
        if(req.file && req.file.cloudStoragePublicUrl ) newProduct = {...newProduct,image:req.file.cloudStoragePublicUrl}
        // let owner = req.user._id
        newProduct = await new Product(newProduct).save()
        if (newProduct) res.status(201).json(newProduct)
        else throw givesError(404, `product cannot be put in the store, check your parameter`)
    }),
    Patch: wrapAsync(async function (req, res) {

        let values = { ...req.body }
        if(req.file && req.file.cloudStoragePublicUrl ) { values.image = req.file.cloudStoragePublicUrl }       

        let updateData = await Product.findByIdAndUpdate(req.params.id, values)
        if (updateData) res.status(200).json({ updateData, msg: `data with id ${req.params.id} updated ` })
        else throw givesError(404, `data with id of ${req.params.id}`)
    }),
    Delete: wrapAsync(async function (req, res) {

        let tobeDeleted = await Product.findOne({ _id: req.params.id })
        let image = tobeDeleted.image


        if (!tobeDeleted.author.equals(req.user._id)) throw givesError(404, 'you are not author of this article')
        
        // let delStatus = await Product.deleteOne({ _id: req.params.id })
        // await
        deleteFromBucket(fileName);
        // res.json({msg:`delete test`})
        if (delStatus.deletedCount == 1)
            res.status(200).json({ deletedData: delStatus, msg: ` data ${req.params.id} is deleted` })
        else if (delStatus.deletedCount == 0)
            throw givesError(404, `cannot delete, check the id`)
        else throw givesError(500, `internal server error while deleting`)
    })
}


module.exports = functions



