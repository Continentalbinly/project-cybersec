const express = require("express");
const {
  registerController,
  loginController,
  updateUserController,
  getUserController,
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

//export
module.exports = router;
