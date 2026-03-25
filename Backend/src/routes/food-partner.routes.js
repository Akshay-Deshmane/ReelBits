const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const foodPartnerController = require("../controllers/foodPartnerController");
const router = express.Router();


/* GET/api/food-partner/:id */
router.get("/:id", authMiddleware.authUserMiddleware, foodPartnerController.getFoodPartnerById)

module.exports = router;