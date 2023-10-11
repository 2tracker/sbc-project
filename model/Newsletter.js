const mongoose = require('mongoose');

const NewsletterSchema = new mongoose.Schema({
  title: String,
  p_image: Array,
  description: String,
});

module.exports = mongoose.model('News', NewsletterSchema);