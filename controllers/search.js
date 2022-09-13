const axios = require("axios");
const { BASE_URL, MULTI_SEARCH } = require("../config/URL");
require("dotenv").config({ path: "../config/.env" });

module.exports = {
    getMedia: (req, res) => {
        console.log(req.query.query)
        axios.get(BASE_URL + MULTI_SEARCH, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                query: req.query.query,
            },
        }).then(results => {    
            console.log(results.data);
            res.render("searchResults.ejs", { results: results.data })
        }).catch(err => console.error(err))
    }
};
