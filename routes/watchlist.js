const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const watchlistController = require("../controllers/watchlist.js");

router.get("/", ensureAuth, watchlistController.getList);
router.put("/update", ensureAuth, watchlistController.updateList);


module.exports = router;
