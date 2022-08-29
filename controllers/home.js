const axios = require("axios");
const {
  BASE_URL,
  NOW_PLAYING_MOVIES,
  UPCOMING_MOVIES,
  IMAGE_URL,
} = require("../config/URL");
require("dotenv").config({ path: "../config/.env" });

module.exports = {
  getIndex: (req, res) => {
    const api_key = process.env.TMDB_API_KEY;
    console.log(api_key);

    const getUpcoming = axios.get(BASE_URL + UPCOMING_MOVIES, {
      params: {
        api_key: api_key,
      },
    });
    const getNowPlaying = axios.get(BASE_URL + NOW_PLAYING_MOVIES, {
      params: {
        api_key: api_key,
      },
    });

    axios
      .all([getUpcoming, getNowPlaying])
      .then(
        axios.spread((...results) => {
          res.render("index.ejs", {
            upComing: results[0].data.results,
            nowPlaying: results[1].data.results,
            imageURL: IMAGE_URL,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  },
};
