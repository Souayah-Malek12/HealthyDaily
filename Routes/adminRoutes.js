const express = require("express");
const { isAdmin, requireSignIn } = require("../Middleware/authMiddleware");
const { getAllUsersController, getUserByIdController, updateUserController, deleteUserController } = require("../Controllers/adminController");
const router = express.Router();

router.get('/', requireSignIn,isAdmin,getAllUsersController);
router.get('/:id',requireSignIn, isAdmin, getUserByIdController);
router.put('/:id',requireSignIn, isAdmin, updateUserController) ;
router.delete('/:id', requireSignIn, isAdmin, deleteUserController);

module.exports= router;