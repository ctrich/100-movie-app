const mongoose = require('mongoose')

const MediaSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
    id: String,
    title: String,
    poster_path: String,
    mediaType: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
});

module.exports = mongoose.model('Media', MediaSchema)