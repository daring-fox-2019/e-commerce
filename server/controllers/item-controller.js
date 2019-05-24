const Item = require("../models/item");

class ItemController {
  static getItems(req, res, next) {
    Item.find()
      .then((items) => {
        console.log("getItems success")
        res.status(200).json(items);
      })
      .catch((err) => {
        next(err);
      });
  }

  static getItem(req, res, next) {
    Item.findOne({ _id: req.params.id })
      .populate({ path: "sellerId", select: "fullName"})
      .then((item) => {
        console.log("getItem success");
        res.status(200).json(item);
      })
      .catch((err) => {
        next(err);
      });
  }

  static createItem(req, res, next) {
    console.log(req.authenticatedUser);
    console.log(req.body);
    const { name, price, stock } = req.body;
    const newItem = {
      name,
      price,
      stock,
      image: req.file.cloudStoragePublicUrl,
      sellerId: req.authenticatedUser.id,
    };
    Item.create(newItem)
      .then((item) => {
        console.log("createItem success");
        res.status(201).json(item);
      })
      .catch((err) => {
        next(err);
      });
  }

  static updateItem(req, res, next) {
    console.log(req.body);
    const { name, price, stock } = req.body;
    const updatedItem = {
      name,
      price,
      stock,
      image: req.file.cloudStoragePublicUrl,
    };
    const options = { new: true, useFindAndModify: false };

    if (!req.file.cloudStoragePublicUrl) {
      const err = { status: 400, message: "Image can't be empty" };
      next(err);
      return;
    }

    Item.findByIdAndUpdate(req.params.id, updatedItem, options)
      .then((item) => {
        console.log("updateItem success");
        res.status(200).json(item);
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteItem(req, res, next) {
    Item.findOneAndDelete({ _id: req.params.id })
      .then((item) => {
        console.log("deleteItem success");
        res.status(200).json(item);
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = ItemController;