const Product = require("../models/product-model");
const Category = require("../models/category-model");
class ProductController {
  static async create(req, res) {
    try {
     
      let url = ''
        if (req.file) {
          url = req.file.gcsUrl
        } 

      let foundCategory = await Category.findOne({
        name: req.body.category
      }).populate("category");

      if (!foundCategory) {
       
        let newCategory = await Category.create({ name: req.body.category });

        let { productName, description, price, stock } = req.body;
        let newProduct = await Product.create({
          productName,
          description,
          price,
          stock,
          category: newCategory._id,
          image: url
        });
        await Category.findOneAndUpdate(
          { _id: newCategory.id },
          { $push: { products: newProduct._id } }
        );
        res.status(201).json(newProduct);
      } else {
        // console.log('MASUK BAWAAAHH');
        
        let { productName, description, price, stock } = req.body;
        let newProduct = await Product.create({
          productName,
          description,
          price,
          stock,
          category: foundCategory._id,
          image: url
        });
        await Category.findOneAndUpdate(
          { name: foundCategory.name },
          { $push: { products: newProduct._id } }
        );
        res.status(201).json(newProduct);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async showAll(req, res) {
   
    try {
      
      let obj = {}
      let { productName, category} = req.query
     
      if( productName) {
        
          let data = await Product.find({productName})
         
          productName = new RegExp(`${productName}`)
          obj = { $or: [{'productName': {$regex: productName, $options: 'i'}}]}
      } 
          
          let products = await Product.find(obj).populate('category')
        
          res.status(200).json(products)

    } catch (error) {
      console.log(error);
      
      res.status(500).json(error);
    }
  }

  static async showByCategory(req, res) {
    try {
      let products = await Product.find({ category: req.params.id });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async delete(req, res) {
    try {
      let deleted = await Product.findByIdAndDelete(req.params.id);
      if (deleted) {
        res
          .status(200)
          .json({ deleted, message: "Successfully delete product" });
      } else {
        res.status(404).json({ message: "not found" });
      }
    } catch (error) {
      if (error.errors) {
        res.status(400).json(error);
      } else {
        res.status(500).json(error);
      }
    }
  }

  static async update(req, res) {
    try {
       
      let gcsUrl = "";
      let categoryId = "";

      if (req.file) {
        gcsUrl = req.file.gcsUrl;
      } else {
        gcsUrl = req.body.image;
      }
      let { productName, description, price, stock, category } = req.body
      let foundCategory = await Category.findOne({ name : req.body.category})
      if (foundCategory) {
          
          let product = await Product.findById(req.params.id)
         
          if (product.category !== foundCategory._id) {
            await Category.findByIdAndUpdate(product.category,{
                $pull : {products : req.params.id}
            })

              let updateProduct = await Product.findByIdAndUpdate(req.params.id,{
                $set : {
                    productName, 
                    description, 
                    price, 
                    stock,
                    image : gcsUrl,
                    category : foundCategory._id}
              }, {new : true, runValidators : true})

              await Category.findOneAndUpdate({ name : req.body.category}, {
                  $push : {
                    products : req.params.id
                  }
              })
              res.status(200).json({updateProduct, message: 'successfully updating data'})
          } else {
            let updateProduct = await Product.findByIdAndUpdate(req.params.id,{
                $set : {
                    productName, 
                    description, 
                    price, 
                    stock,
                    image : gcsUrl,
                    category : foundCategory._id}
             })
             res.status(200).json({updateProduct, message: 'successfully updating data'})
          }
      } else {
         
          let product = await Product.findById(req.params.id)
         
          let newCategory = await Category.create({ name : req.body.category})
         
          let updateCategory = await Category.findByIdAndUpdate(newCategory._id, {
              $push : {products : req.params.id}
          })
          let haha = await Category.findByIdAndUpdate(product.category._id,{
              $pull : {products : req.params.id}
          })
       
          
          let updateProduct = await Product.findByIdAndUpdate(req.params.id,{
              $set : {
                productName, 
                description, 
                price, 
                stock,
                image : gcsUrl,
                category : newCategory._id
              }
          },{new : true, runValidators : true})
          res.status(200).json({updateProduct, message: 'successfully updating data'})
        }
    } catch (error) {
       
      if (error.errors) {
        res.status(400).json(error);
      } else {
        res.status(500).json(error);
      }
    }
  }

  static async showOne(req, res) {
    try {
      let product = await Product.findOne({ _id: req.params.id }).populate(
        "category"
      );
      res.status(200).json(product);
    } catch (error) {
      if (error.errors) {
        res.status(400).json(error);
      } else {
        res.status(500).json(error);
      }
    }
  }
}

module.exports = ProductController;
