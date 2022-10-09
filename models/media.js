const mongoose = require('mongoose')

const MediaSchema = new mongoose.Schema({
  watchlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Watchlist",
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