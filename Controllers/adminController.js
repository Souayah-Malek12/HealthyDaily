const userModel = require("../Models/user");





const getAllUsersController = async (req, res) => {
    try {
      const users = await userModel.find({role:{$ne :"Admin"}}).select("-password");
      return res.status(200).send({
        success: true,
        message: "All users fetched successfully",
        users,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).send({
        success: false,
        message: `Error: ${error.message}`,
      });
    }
  };
  

  const getUserByIdController = async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id).select("-password");
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
      return res.status(200).send({
        success: true,
        message: "User fetched successfully",
        user,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(500).send({
        success: false,
        message: `Error: ${error.message}`,
      });
    }
  };

  const updateUserController = async (req, res) => {
    try {
      const updatedUser = await userModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      ).select("-password");
  
      if (!updatedUser) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
  
      return res.status(200).send({
        success: true,
        message: "User updated successfully",
        updatedUser,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).send({
        success: false,
        message: `Error: ${error.message}`,
      });
    }
  };
  

  const deleteUserController = async (req, res) => {
    try {
      const deletedUser = await userModel.findByIdAndDelete(req.params.id);
  
      if (!deletedUser) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
  
      return res.status(200).send({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).send({
        success: false,
        message: `Error: ${error.message}`,
      });
    }
  };
  
  module.exports= {getAllUsersController, getUserByIdController, updateUserController, deleteUserController}