const axios = require("axios");
const { BASE_URL, MOVIE_SEARCH, TV_SEARCH, IMAGE_URL } = require("../config/URL");
require("dotenv").config({ path: "../config/.env" });

module.exports = {
    getMovie: (req, res) => {
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

        axios
            .all([movieSearch, credits, providers, trailers, similar])
            .then(
        axios.spread((...results) => {
            console.log(results[2].data.results.US)
                    res.render("details.ejs",{
                        results: results[0].data,
                        credits: results[1].data.crew.filter(crew => crew.job === "Director"),
                        providers: results[2].data.results.US,
                        trailers: results[3].data.results.slice(0, 3),
                        similar: results[4].data.results,
            imageURL: IMAGE_URL,
          });
                })
            ).catch(err => {
                console.log(err);
            });
    },

    getTv: (req, res) => {
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

        axios
            .all([tvSearch, credits, providers, trailers, similar])
            .then(
        axios.spread((...results) => {
            console.log(results[2].data.results.US)
                res.render("details.ejs",{
                    results: results[0].data,
                    credits: results[1].data.crew.filter(crew => crew.job === "Director"),
                    providers: results[2].data.results.US,
                    trailers: results[3].data.results.slice(0, 3),
                    similar: results[4].data.results,
        imageURL: IMAGE_URL,
                });
            })
            ).catch(err => {
                console.log(err);
            });
    },
};
