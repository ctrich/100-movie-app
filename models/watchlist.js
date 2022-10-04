const mongoose = require('mongoose')

const WatchlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  media: [{
    id: String,
    title: String,
    poster_path: String,
    type: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
});

module.exports = mongoose.model('Watchlist', WatchlistSchema)