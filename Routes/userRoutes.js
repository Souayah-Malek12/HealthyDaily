const express = require("express");
const { calcDailyCalorController, updatebodyBmiController, updateCalcDailyCalorController, userDetailsController } = require("../Controllers/userController");
const { requireSignIn } = require("../Middleware/authMiddleware");
const router = express.Router();


router.get('/dailyCal', requireSignIn, userDetailsController);
router.get('/profil', requireSignIn, userDetailsController);


router.put('/update', requireSignIn, updateCalcDailyCalorController);

router.put('/bmi', requireSignIn, updatebodyBmiController);


module.exports = router ;
