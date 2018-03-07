var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Product = new Schema({
    name: {type: String, required: true},
    brand: {type: String, required: true},
    price: {type: Number, required: true}
});

module.exports = mongoose.model('Product', Product);