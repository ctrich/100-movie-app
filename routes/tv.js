const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth")
const tvController = require("../controllers/tv.js")

router.get("/popular", ensureAuth, tvController.getPopular);
router.get("/topRated", ensureAuth, tvController.getTopRated);
router.get("/onAir", ensureAuth, tvController.getOnAir);
router.get("/airingToday", ensureAuth, tvController.getAiringToday);


module.exports = router;
