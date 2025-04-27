const express = require("express");
const { calcDailyCalorController } = require("../Controllers/userController");
const { requireSignIn } = require("../Middleware/authMiddleware");
const router = express.Router();


router.get('/dailyCal', requireSignIn, calcDailyCalorController);

module.exports = router ;
