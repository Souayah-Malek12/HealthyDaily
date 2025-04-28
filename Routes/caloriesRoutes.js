const express = require("express");
const { updateRemainingCals } = require("../Controllers/caloriesController");
const { requireSignIn } = require("../Middleware/authMiddleware");
const router = express.Router();

router.put('/RemainingCal', requireSignIn,updateRemainingCals);


module.exports = router;