const axios = require("axios");
const { 
    BASE_URL, 
    POPULAR_MOVIES, 
    UPCOMING_MOVIES, 
    TOP_RATED, 
    NOW_PLAYING_MOVIES, 
    IMAGE_URL 
} = require("../config/URL");
require("dotenv").config({ path: "../config/.env" });

module.exports = {
    getPopular: (req, res) => {
        axios.get(BASE_URL + POPULAR_MOVIES, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                region: "US",
            },
        }).then(results => {    
            res.render("movies.ejs", { movies: results.data.results, imageURL: IMAGE_URL});
        }).catch(err => console.error(err))
    },

    getUpcoming: (req, res) => {
        axios.get(BASE_URL + UPCOMING_MOVIES, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                region: "US",
            },
        }).then(results => {
            res.render("movies.ejs", {movies: results.data.results, imageURL: IMAGE_URL});
        }).catch(err => console.error(err))
    },

    getTopRated: (req, res) => {
        axios.get(BASE_URL + TOP_RATED, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                region: "US",
            },
        }).then(results => {
            res.render("movies.ejs", {movies: results.data.results, imageURL: IMAGE_URL});
        }).catch(err => console.err(err))
    },

    getNowPlaying: (req, res) => {
        axios.get(BASE_URL + NOW_PLAYING_MOVIES, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                region: "US",
            },
        }).then(results => {
            res.render("movies.ejs", {movies: results.data.results, imageURL: IMAGE_URL});
        }).catch(err => console.err(err))
    },
};
