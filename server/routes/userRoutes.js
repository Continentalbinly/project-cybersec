const express = require("express");
const {
  registerController,
  loginController,
  updateUserController,
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

//export
module.exports = router;
