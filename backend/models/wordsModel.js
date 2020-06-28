let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let wordSchema = mongoose.Schema({
  "words": {}
}, {strict: false});




module.exports = mongoose.model('Words', wordSchema)