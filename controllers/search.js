const axios = require("axios");
const { BASE_URL, MULTI_SEARCH, IMAGE_URL } = require("../config/URL");
require("dotenv").config({ path: "../config/.env" });

module.exports = {
    getMedia: (req, res) => {
        //console.log(req)
        //console.log(req.query.query, req.query.page)
        let page = req.query.page || 1;
        axios.get(BASE_URL + MULTI_SEARCH, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                query: req.query.query,// || query,
                page: req.query.page || 1,
            },
        }).then(results => {    
           // console.log(results.data);
            res.locals.media = results.data.results;
            if(page === 1) {
                res.render("searchResults.ejs", { results: results.data.results.filter(x => x.media_type !== "person"), imageURL: IMAGE_URL })
            } else {
                res.send({ results: results.data });  
                console.log('this is after the response')          
            }
            
           // console.log(results.data.results, 'this is before the response')
           
            

        }).catch(err => console.error(err))
    }
};
