const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const watchlistController = require("../controllers/watchlist.js");

router.get("/", ensureAuth, watchlistController.getList);
router.post("/add", ensureAuth, watchlistController.add);


module.exports = router;
