var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImgSchema = new Schema({
  title: String,
  url: String,
  date: Date
});

var Img = mongoose.model('Img',ImgSchema);

module.exports = Img;