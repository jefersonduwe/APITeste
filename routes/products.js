var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var mongoose = require('mongoose');

/* GET products */
router.get('/', function (req, res, next) {
    Product.find()
            .then(function (rows) {
                res.json(rows);
            })
            .catch(function (err) {
                console.error(err);
                next({'status': 500, 'message': 'An error occurred while getting the products.'});
            });
});

/* GET product */
router.get('/:id', function (req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).send();
    }
    Product.findById(req.params.id)
            .then(function (product) {
                if (product) {
                    res.json(product);
                } else {
                    res.status(404).send();
                }
            })
            .catch(function (err) {
                console.error(err);
                next({'status': 500, 'message': 'An error occurred while getting the product.'});
            });
});

/* POST product. */
router.post('/', function (req, res, next) {
    var newProduct = new Product(req.body);
    newProduct.save()
            .then(function (product) {
                res.status(201).send();
            })
            .catch(function (err) {
                console.error(err);
                if (err.name === 'ValidationError') {
                    next({'status': 400, 'message': err.message});
                } else {
                    next({'status': 500, 'message': 'An error occurred while saving the product.'});
                }
            });
});

/* PUT product. */
router.put('/:id', function (req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).send();
    }
    Product.findById(req.params.id)
            .then(function (product) {
                if (product) {
                    product.name = req.body.name;
                    product.brand = req.body.brand;
                    product.price = req.body.price;
                    return product.save();
                }
                return false;
            })
            .then(function (product) {
                if (product === false) {
                    res.status(404).send();
                } else {
                    res.status(204).send();
                }
            })
            .catch(function (err) {
                console.error(err);
                if (err.name === 'ValidationError') {
                    next({'status': 400, 'message': err.message});
                } else {
                    next({'status': 500, 'message': 'An error occurred while saving the product.'});
                }
            });
});

/* DELETE product. */
router.delete('/:id', function (req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).send();
    }
    Product.findById(req.params.id)
            .then(function (product) {
                if (product) {
                    return product.remove();
                }
                return false;
            })
            .then(function (product) {
                if (product === false) {
                    res.status(404).send();
                } else {
                    res.status(204).send();

                }
            })
            .catch(function (err) {
                console.error(err);
                next({'status': 500, 'message': 'An error occurred while deleting the product.'});
            });
});

module.exports = router;