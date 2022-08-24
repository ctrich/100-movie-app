const axios = require("axios");
const { BASE_URL, POPULAR_MOVIES, IMAGE_URL } = require("../config/URL");
require("dotenv").config({ path: "../config/.env" });

module.exports = {
  getIndex: (req, res) => {
    axios
      .get(`${BASE_URL}${POPULAR_MOVIES}${process.env.TMDB_API_KEY}`)
      .then((data) => {
        res.render("index.ejs", {
          popularMovies: data.data.results,
          imageURL: IMAGE_URL,
        });
      })
      .catch((err) => console.log(err));
  },
};
