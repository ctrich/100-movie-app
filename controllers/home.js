const axios = require("axios");
const { BASE_URL, NOW_PLAYING_MOVIES, IMAGE_URL } = require("../config/URL");
require("dotenv").config({ path: "../config/.env" });

module.exports = {
  getIndex: (req, res) => {
    axios
      .get(`${BASE_URL}${NOW_PLAYING_MOVIES}${process.env.TMDB_API_KEY}`)
      .then((data) => {
        res.render("index.ejs", {
          nowPlaying: data.data.results,
          imageURL: IMAGE_URL,
        });
      })
      .catch((err) => console.log(err));
  },
};
