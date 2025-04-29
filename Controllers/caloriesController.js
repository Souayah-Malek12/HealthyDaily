const userModel = require("../models/User");

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

        let newRemainingCalories = user.remainingCalories-((user.dailyCal * coefbalance));
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
module.exports = { updateRemainingCals };
