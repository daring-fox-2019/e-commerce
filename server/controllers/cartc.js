const Cart = require(`../models/cart`);

class cCart {
  static create(req, res) {
    Cart.create(req.body)
      .then(created => {
        res.status(201).json(created);
      })
      .catch(err => {
        res.status(500).json({ message: `internal server error` });
      });
  }

  static delete(req, res) {
    Cart.findByIdAndDelete(req.params.id)
      .then(deleted => {
        res.status(200).json(deleted);
      })
      .catch(err => {
        res.status(500).json({ message: `internal server error` });
      });
  }

  static detail(req, res) {
    Cart.findById(req.params.id)
      .then(found => {
        if (found) {
          res.status(200).json(found);
        } else {
          res.status(200).json({ message: `that is not exists` });
        }
      })
      .catch(err => {
        res.status(500).json({ message: `internal server error` });
      });
  }

  static carts(req, res) {
    Cart.find({})
      .then(founds => {
        if (req.query.status) {
          let result = [];
          founds.forEach(cart => {
            if (cart.status == req.query.status) {
              result.push(cart);
            }
          });
          res.status(200).json(result)
        } else {
          res.status(200).json(founds);
        }
      })
      .catch(err => {});
  }

  static update(req, res) {
    Cart.findByIdAndUpdate(req.params.id, req.body)
      .then(updated => {
        res.status(201).json(updated);
      })
      .catch(err => {
        res.status(500).json({ message: `internal server error` });
      });
  }
}
