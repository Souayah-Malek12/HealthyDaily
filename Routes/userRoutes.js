const express = require("express");
const { calcDailyCalorController, updatebodyBmiController, updateCalcDailyCalorController } = require("../Controllers/userController");
const { requireSignIn } = require("../Middleware/authMiddleware");
const router = express.Router();


router.get('/dailyCal', requireSignIn, calcDailyCalorController);
router.put('/update', requireSignIn, updateCalcDailyCalorController);

router.put('/bmi', requireSignIn, updatebodyBmiController);


module.exports = router ;
