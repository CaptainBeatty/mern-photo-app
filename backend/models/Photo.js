const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'] },
  imageUrl: { type: String, required: [true, 'Image URL is required'] },
}, { timestamps: true });

module.exports = mongoose.model('Photo', PhotoSchema);
