const userModel = require("../models/User");
const foods = require('../utils/meals.json');

const updateRemainingCals = async (req, res) => {
    try {
        // Extract meal from request body
        const { meal } = req.body;

        // Fetch the user details from the database
        const user = await userModel.findById(req.user);

        // Validate that the user exists
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }
        let coefbalance;
        switch (meal) {
            case "Breakfast":
                coefbalance = 0.25;
                break;
            case "morningSnack":
                coefbalance = 0.05;
                break;
            case "Lunch":
                coefbalance = 0.40;
                break;
            case "afternoonSnack":
                coefbalance = 0.05;
                break;
            case "Dinner":
                coefbalance = 0.25;
                break;
            default:
                return res.status(400).send({
                    success: false,
                    message: "Invalid meal provided",
                });
        }
        const consumedCalors = (user.dailyCal * coefbalance)
        let newRemainingCalories = user.remainingCalories-(consumedCalors);
        if(newRemainingCalories<0){
            newRemainingCalories=0
        }
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user,
            { remainingCalories: newRemainingCalories },
            { new: true } // Return the updated document
        );

        const {remainingCalories} = updatedUser;
        
        return res.status(200).send({
            success: true,
            message: "Remaining calories updated successfully",
            consumedCalors: consumedCalors,
            remainingCalories,
        });

    } catch (error) {
        console.error("Error in updating remaining calories:", error);
        return res.status(500).send({
            success: false,
            message: `Error updating remaining calories: ${error.message}`,
        });
    }
};

const getDailyCalories = async () => {
    try {
      const user = await userModel.findById(req.user).select("dailyCal");
      if (!user) {
        throw new Error("User not found");
      }
      return user.dailyCal;
    } catch (error) {
      console.error("Error getting daily calories:", error);
      throw error;
    }
  };
  


  const suggestMealController = (req, res) => {
    try {
      const { mealType } = req.params; // 'snacks', 'main_meals', etc.
      const { consumedCalories } = req.body;
  
      if (!foods.meals || !foods.meals[mealType]) {
        return res.status(400).json({
          success: false,
          message: 'Invalid or missing meal type',
        });
      }
  
      const mealFoods = foods.meals[mealType];
      let selectedFoods = [];
      let totalCalories = 0;
      const usedIndexes = new Set();
  
      while (totalCalories < consumedCalories && usedIndexes.size < mealFoods.length) {
        const randomIndex = Math.floor(Math.random() * mealFoods.length);
        if (usedIndexes.has(randomIndex)) continue;
  
        usedIndexes.add(randomIndex);
        const randomFood = mealFoods[randomIndex];
  
        selectedFoods.push(randomFood);
        totalCalories += randomFood.calories_per_100g;
      }
  
      return res.status(200).json({
        success: true,
        mealType,
        targetCalories: consumedCalories,
        totalCalories,
        foods: selectedFoods,
      });
    } catch (error) {
      console.error('Error in suggestMealController:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message,
      });
    }
  };
  
  







module.exports = { updateRemainingCals, getDailyCalories ,  suggestMealController};
