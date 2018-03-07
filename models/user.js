var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true, select: false}
});
module.exports = mongoose.model('User', User);