const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth")
const trailerController = require("../controllers/trailer");

router.get("/:id", ensureAuth, trailerController.getTrailer);

module.exports = router;
