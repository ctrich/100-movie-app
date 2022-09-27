const axios = require("axios");
const { BASE_URL, POPULAR_MOVIES, IMAGE_URL } = require("../config/URL");
require("dotenv").config({ path: "../config/.env" });

module.exports = {
    getPopular: (req, res) => {
        axios.get(BASE_URL + POPULAR_MOVIES, {
            params: {
                api_key: process.env.TMDB_API_KEY,
            },
        }).then(results => {    
            console.log(results.data);
            res.render("movies.ejs", { movies: results.data.results, imageURL: IMAGE_URL});
        }).catch(err => console.error(err))
    }
};
