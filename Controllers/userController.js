const userModel = require("../models/User");

const calcDailyCalorController = async (req, res) => {
    try {
      const userId = req.user;
      console.log(userId);  // For debugging purpose (should be removed in production)
      
      // Fetch the user details from the database
      const user = await userModel.findById(userId);
  
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
  
      const { age, sex, height, weight, dailyActivity, goal } = user;
      // Ensure all necessary data is provided
      if (!age || !sex || !height || !weight || !dailyActivity || !goal) {
        return res.status(400).send({
          success: false,
          message: "Missing necessary data for calorie calculation",
        });
      }
  
      const heightInCm = height * 100;

      // Validate age (it should be a number and reasonable)
      if (isNaN(age) || age < 18 || age > 100) {
        return res.status(400).send({
          success: false,
          message: "Invalid age provided",
        });
      }      
      let BMR;
      // Calculate BMR based on sex
      if (sex === "male") {
        BMR = 10 * weight + 6.25 * heightInCm - 5 * age + 5;
      } else if (sex === "female") {
        BMR = 10 * weight + 6.25 * heightInCm - 5 * age - 161;
      } else {
        return res.status(400).send({
          success: false,
          message: "Invalid sex provided",
        });
      }
  
      // Determine activity multiplier based on the daily activity
      let activityMultiplier;
      switch (dailyActivity) {
        case "Student":
        case "Intellectual Work":
        case "Housework":
          activityMultiplier = 1.2; // Sedentary to light activity
          break;
        case "Light Manual Work":
          activityMultiplier = 1.375; // Light physical work
          break;
        case "Moderate Manual Work":
          activityMultiplier = 1.55; // Moderate physical work
          break;
        case "Heavy Manual Work":
          activityMultiplier = 1.725; // Very active work
          break;
        case "Athlete":
          activityMultiplier = 1.9; // Extremely active (high-intensity)
          break;
        default:
          return res.status(400).send({
            success: false,
            message: "Invalid activity level",
          });
      }
  
      // Calculate total daily calorie needs (TDEE)
      let dailyCalories = BMR * activityMultiplier;
  
      // Adjust based on goal
      if (goal === "Maintain") {
        // No change, calories needed to maintain current weight
      } else if (goal === "Lose") {
        dailyCalories -= 500; // Subtract 500 calories to aim for weight loss
      } else if (goal === "Gain") {
        dailyCalories += 500; // Add 500 calories to aim for weight gain
      } else {
        return res.status(400).send({
          success: false,
          message: "Invalid goal provided",
        });
      }
  
      // Ensure calories are not negative (in case of weight loss goal with very low daily intake)
      if (dailyCalories < 1200) {
        dailyCalories = 1200; // Minimum safe calorie intake
      }
      
      await userModel.findOneAndUpdate(
        { _id: userId }, 
        { dailyCal: dailyCalories }, 
       
    );

      // Send the calculated calories as a response
      return res.status(200).send({
        success: true,
        message: "Calories calculation successful",
        user
      });

      
    } catch (error) {
      console.error("Error in calculating daily calories:", error);
      return res.status(500).send({
        success: false,
        message: `Error calculating daily calories: ${error.message}`,
      });
    }
  };
  
module.exports = { calcDailyCalorController };
