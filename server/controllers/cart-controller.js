const Cart = require("../models/cart-model");
const Product = require("../models/product-model");
const axios = require("axios");

class CartController {
  static async create(req, res) {
    try {
      let newCart = await Cart.create({
        UserId: req.authenticatedUser.id,
        ProductId: req.body.ProductId,
        amount: req.body.amount
      });
      let updateStock = await Product.findByIdAndUpdate(req.body.ProductId,{
          $inc : { stock : -1 }
      })
      res.status(201).json(newCart);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async showCart(req, res) {
    try {
      let carts = await Cart.find({ UserId: req.authenticatedUser.id })
        .populate("UserId")
        .populate("ProductId");
      res.status(200).json(carts);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  static async update(req, res) {
    try {
      if (req.body.compute) {
          
        let cart = await Cart.findById(req.params.id).populate("ProductId");

        if (req.body.compute == "add") {
          if (cart.ProductId.stock - 1 > 0) {
            let updated = await Cart.findOneAndUpdate(
              { _id: req.params.id },
              {
                $inc: { amount: 1 }
              },
              { new: true }
            );

            await Product.findByIdAndUpdate(cart.ProductId._id, {
              $inc: { stock: -1 }
            });
            res.status(200).json(updated);
          } else {
            res.status(500).json({ msg: "Items is out of stock" });
          }
        } else {
          let updated = await Cart.findOneAndUpdate(
            { _id: req.params.id },
            {
              $inc: { amount: -1 }
            },
            { new: true }
          );

          await Product.findByIdAndUpdate(cart.ProductId._id, {
            $inc: { stock: 1 }
          });
          res.status(200).json(updated);
        }
      } else {
         
          let carts = await Cart.find({ UserId : req.params.id })
          
          carts.forEach(cart => {
              Product.findByIdAndUpdate(cart.ProductId, {
                  $inc : { stock : cart.amount}
              })
              .then(()=> {
                  console.log('success');
              })
          })
          
          let deleteCart = await Cart.deleteMany({UserId : req.params.id})
          res.status(200).json({ msg : 'transaction has been canceled'})
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  static async delete(req, res) {
    try {
      let deleted = await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json(deleted);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getProvince(req, res) {
    try {
      let { data } = await axios
        .get(`https://api.rajaongkir.com/starter/province`, {
          headers: { key: '856aa66a010563c3392d12a24eacc516' }
        })      
          res.status(200).json(data.rajaongkir.results);
    } catch (error) {
       
      res.status(500).json(error);
    }
  }

  static async getCities(req, res) {
    try {
      let { data } = await axios.get(`https://api.rajaongkir.com/starter/city`, {
        headers: { key: '856aa66a010563c3392d12a24eacc516'}
      });
      
      res.status(200).json(data.rajaongkir.results);
    } catch (error) {
    console.log(error)
      res.status(500).json(error);
    }
  }

  static async getCosts(req, res) {
    try {
      let { origin, destination, weight, courier } = req.body;
        console.log(req.body,'===');
        
      let { data } = await axios.post(
        `https://api.rajaongkir.com/starter/cost`,
        {
          origin,
          destination,
          weight,
          courier
        },
        {
          headers: { key: '856aa66a010563c3392d12a24eacc516'}
        }
      );
      console.log(data,'== ongkir');
      
      res.status(200).json(data.rajaongkir.results[0].costs[0].cost[0].value);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = CartController;
