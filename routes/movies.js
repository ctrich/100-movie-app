const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth")
const movieController = require("../controllers/movies.js")

router.get("/popular", ensureAuth, movieController.getPopular);
router.get("/upcoming", ensureAuth, movieController.getUpcoming);
router.get("/topRated", ensureAuth, movieController.getTopRated);
router.get("/nowPlaying", ensureAuth, movieController.getNowPlaying);

module.exports = router;
