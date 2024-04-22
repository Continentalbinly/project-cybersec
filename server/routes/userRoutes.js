const express = require("express");
const {
  registerController,
  loginController,
  updateUserController,
  getUserController,
  getAllUsersController,
  updateUserStatusController,
} = require("../controllers/userController");

//router object
const router = express.Router();

//routes
//REGISTER
router.post("/register", registerController);
//LOGIN
router.post("/login", loginController);
//UPDATE
router.put("/update-user", updateUserController);
//FETCH
router.get("/fetchuser", getUserController);
//FETCH Alluser
router.get("/fetchalluser", getAllUsersController);
//Update user status by ID
router.put("/update-user-status", updateUserStatusController);

//export
module.exports = router;
