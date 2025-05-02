const express = require("express");
const { updateRemainingCals, getDailyCalories, getFoodSuggestionController, suggestMealController } = require("../Controllers/caloriesController");
const { requireSignIn } = require("../Middleware/authMiddleware");
const router = express.Router();

router.put('/RemainingCal', requireSignIn,updateRemainingCals);


router.get('/dailyCals', requireSignIn, getDailyCalories);

router.get('/suggestion/:mealType', requireSignIn, suggestMealController)


module.exports = router;