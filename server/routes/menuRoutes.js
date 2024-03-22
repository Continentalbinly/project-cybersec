const express = require("express");
const { requireSignIn } = require("../controllers/userController");
const {
  createMenuController,
  updateMenuController,
  getMenuController,
} = require("../controllers/menuController");

//router object
const router = express.Router();

//routes
//CreateMenu
router.post("/createmenu", requireSignIn, createMenuController);

//UpdateMenu
router.put("/updatemenu", updateMenuController);

//GetMenu
router.get("/getmenu", getMenuController);

//export
module.exports = router;
