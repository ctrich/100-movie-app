const axios = require("axios");
const { 
    BASE_URL, 
    TV_POPULAR,
    TV_TOP_RATED,
    TV_ON_AIR,
    TV_AIRING_TODAY,
    IMAGE_URL 
} = require("../config/URL");
require("dotenv").config({ path: "../config/.env" });

module.exports = {
    getPopular: (req, res) => {
        axios.get(BASE_URL + TV_POPULAR, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                region: "US",
            },
        }).then(results => {    
            res.render("tv.ejs", { movies: results.data.results, imageURL: IMAGE_URL});
        }).catch(err => console.error(err))
    },

    getOnAir: (req, res) => {
        axios.get(BASE_URL + TV_ON_AIR, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                region: "US",
            },
        }).then(results => {
            res.render("tv.ejs", {movies: results.data.results, imageURL: IMAGE_URL});
        }).catch(err => console.error(err))
    },

    getTopRated: (req, res) => {
        axios.get(BASE_URL + TV_TOP_RATED, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                region: "US",
            },
        }).then(results => {
            res.render("tv.ejs", {movies: results.data.results, imageURL: IMAGE_URL});
        }).catch(err => console.err(err))
    },

    getAiringToday: (req, res) => {
        axios.get(BASE_URL + TV_AIRING_TODAY, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                region: "US",
            },
        }).then(results => {
            res.render("tv.ejs", {movies: results.data.results, imageURL: IMAGE_URL});
        }).catch(err => console.err(err))
    },
};
