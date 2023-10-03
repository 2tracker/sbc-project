const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: String,
  p_image: Array,
  description: String,
});

module.exports = mongoose.model('Product', ProductSchema);