const axios = require("axios");
const { BASE_URL, MULTI_SEARCH, IMAGE_URL } = require("../config/URL");
require("dotenv").config({ path: "../config/.env" });

module.exports = {
    getMedia: (req, res) => {
        console.log(req.query.query)
        axios.get(BASE_URL + MULTI_SEARCH, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                query: req.query.query,
                page: req.body.page || 1,
            },
        }).then(results => {    
            console.log(results.data);
            res.render("searchResults.ejs", { results: results.data.results.filter(x => x.media_type !== "person"), imageURL: IMAGE_URL })
        }).catch(err => console.error(err))
    }
};
