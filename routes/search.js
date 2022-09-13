const express = require("express");
const router = express.Router();
const searchController = require("../controllers/search");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, searchController.getMedia);


module.exports = router;
