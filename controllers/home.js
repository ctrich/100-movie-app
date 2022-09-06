const axios = require("axios");
const {
  BASE_URL,
  NOW_PLAYING_MOVIES,
  UPCOMING_MOVIES,
  IMAGE_URL,
  POPULAR_TV,
} = require("../config/URL");
require("dotenv").config({ path: "../config/.env" });

module.exports = {
  getIndex: (req, res) => {
    const api_key = process.env.TMDB_API_KEY;

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
    const getPopularTv = axios.get(BASE_URL + POPULAR_TV, {
      params: {
        api_key: api_key,
      },
    });

    axios
      .all([getUpcoming, getNowPlaying, getPopularTv])
      .then(
        axios.spread((...results) => {
          res.render("index.ejs", {
            upcoming: results[0].data.results,
            nowPlaying: results[1].data.results,
            popularTv: results[2].data.results,
            imageURL: IMAGE_URL,
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  },
};
