const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  cloudinaryId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    // Examples: "New Plot Open", "Saryu Facing", "Premium South", "Sold Out"
  },
  description: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Gallery', gallerySchema);
