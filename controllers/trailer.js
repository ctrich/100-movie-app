const axios = require("axios");
const { BASE_URL, MULTI_SEARCH, IMAGE_URL } = require("../config/URL");
require("dotenv").config({ path: "../config/.env" });

module.exports = {
    getTrailer: (req, res) => {
        console.log(req.query.query)
        axios.get(BASE_URL + "movie/" + req.params.id + "/videos?", {
            params: {
                api_key: process.env.TMDB_API_KEY,
            },
        }).then(results => {    
            console.log(results.data.results)
        }).catch(err => console.error(err))
    }
};
