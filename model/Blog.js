const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: String,
  p_image: Array,
  description: String,
});

module.exports = mongoose.model('BlogSchema', BlogSchema);