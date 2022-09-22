const express = require("express");
const router = express.Router();
const infoController = require("../controllers/details");
const { ensureAuth } = require("../middleware/auth");

router.get("/movie/:id", ensureAuth, infoController.getMovie);
router.get("/tv/:id", ensureAuth, infoController.getTv);


module.exports = router;
