const Product = require(`../models/product`);

class cProduct {
  static create(req, res) {
    console.log(req.body)
    Product.create(req.body)
      .then(created => {
        res.status(201).json(created);
      })
      .catch(err => {
        res.status(500).json({ message: `internal server error` });
      });
  }

  static delete(req, res) {
    Product.findByIdAndDelete(req.params.id)
      .then(deleted => {
        res.status(200).json(deleted);
      })
      .catch(err => {
        res.status(500).json({ message: `internal server error` });
      });
  }

  static detail(req, res) {
    Product.findById(req.params.id)
      .then(found => {
        if (found) {
          res.status(200).json(found);
        } else {
          res.status(400).json({ message: `that is not exists` });
        }
      })
      .catch(err => {
        res.status(500).json({ message: `internal server error` });
      });
  }

  static products(req, res) {
    Product.find()
      .then(founds => {
        if (req.query.status == "ready" && founds.length >=1) {
          let ready = [];
          founds.forEach(item => {
            if (item.stock > 0) {
              ready.push(item);
            }
          });
          let asc = ready.sort((a, b) => {
            return a.price - b.price;
          });
          if (req.query.sort == "desc") {
            res.status(200).json(asc.reverse());
          } else {
            res.status(200).json(asc);
          }
        } else if (founds.length >= 1) {
          let result = founds.sort((a, b) => {
            return a.price - b.price;
          });
          if (req.query.sort == "desc") {
            res.status(200).json(result.reverse());
          } else {
            res.status(200).json(result);
          }
        } else {
          res.status(200).json(founds);
        }
      })
      .catch(err => {
        res.status(500).json({ message: `internal server error` });
      });
  }

  static update(req, res) {
    Product.findByIdAndUpdate(req.params.id, req.body)
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(err => {
        res.status(500).json({ message: `internal server error` });
      });
  }
}

module.exports = cProduct;
