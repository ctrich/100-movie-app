const axios = require("axios");
const { BASE_URL, MOVIE_SEARCH, TV_SEARCH, IMAGE_URL } = require("../config/URL");
const Watchlist = require('../models/Watchlist');
require("dotenv").config({ path: "../config/.env" });

module.exports = {
    getMovie: async (req, res) => {
        const type = req.url.split('/')[1];
        try {
            let inWatchlist = false
            if (req.user) {
                const watchlist = await Watchlist.findOne({ user: req.user, title: 'watchlist' }).lean();
                inWatchlist = watchlist.media.some(movie => movie.id === req.params.id);
                console.log(inWatchlist);
            }
        
        const credits = axios.get(BASE_URL + "movie/" + req.params.id + "/credits?",{
            params: {
                api_key: process.env.TMDB_API_KEY,
            },
        });
        const movieSearch = axios.get(BASE_URL + MOVIE_SEARCH + req.params.id + '?', {
            params: {
                api_key: process.env.TMDB_API_KEY,
            },
        });
        const providers = axios.get(BASE_URL + "movie/" + req.params.id + "/watch/providers?", {
            params: {
                api_key: process.env.TMDB_API_KEY,
            },
        });
        const trailers = axios.get(BASE_URL + "movie/" + req.params.id + "/videos?", {
            params: {
                api_key: process.env.TMDB_API_KEY,
            },
        });
        const similar = axios.get(BASE_URL + "movie/" + req.params.id + "/similar?", {
            params: {
                api_key: process.env.TMDB_API_KEY,
            },
        });

        const results = await axios.all([movieSearch, credits, providers, trailers, similar]);
 
        res.render("details.ejs",{
            results: results[0].data,
            credits: results[1].data.crew.filter(crew => crew.job === "Director"),
            providers: results[2].data.results.US,
            trailers: results[3].data.results.slice(0, 3),
            similar: results[4].data.results,
            type: type,
            inWatchlist: inWatchlist,
            imageURL: IMAGE_URL,
          });

        }catch(err) {
            console.log("This is where its coming from", err);
        }
    },

    getTv: async (req, res) => {
        const type = req.url.split('/')[1];
        try {
            let inWatchlist = false
            if (req.user) {
                const watchlist = await Watchlist.findOne({ user: req.user, title: 'watchlist' }).lean();
                inWatchlist = watchlist.media.some(movie => movie.id === req.params.id);
                console.log(inWatchlist);
            }
            
        
        const credits = axios.get(BASE_URL + "tv/" + req.params.id + "/credits?",{
            params: {
                api_key: process.env.TMDB_API_KEY,
            },
        });
        const tvSearch = axios.get(BASE_URL + TV_SEARCH + req.params.id + '?', {
            params: {
                api_key: process.env.TMDB_API_KEY,
            },
        });
        const providers = axios.get(BASE_URL + "tv/" + req.params.id + "/watch/providers?", {
            params: {
                api_key: process.env.TMDB_API_KEY,
            },
        });
        const trailers = axios.get(BASE_URL + "tv/" + req.params.id + "/videos?", {
            params: {
                api_key: process.env.TMDB_API_KEY,
            },
        });
        const similar = axios.get(BASE_URL + "tv/" + req.params.id + "/similar?", {
            params: {
                api_key: process.env.TMDB_API_KEY,
            },
        });

        const results = await axios.all([tvSearch, credits, providers, trailers, similar]);
          
        res.render("details.ejs",{
            results: results[0].data,
            credits: results[1].data.crew.filter(crew => crew.job === "Director"),
            providers: results[2].data.results.US,
            trailers: results[3].data.results.slice(0, 3),
            similar: results[4].data.results,
            type: type,
            inWatchlist: inWatchlist,
            imageURL: IMAGE_URL,
        });  
        }catch(err) {
            console.log(err);
        }
    }
};
