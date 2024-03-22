const menuModel = require("../models/menuModel");

//createMenu
const createMenuController = async (req, res) => {
  try {
    const { MenuName, Categlory, Price, ImageURL, Priority } = req.body;
    //validation
    if (!MenuName || !Categlory || !Price || !ImageURL || !Priority) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    //exisiting menu
    const exisitingMenu = await menuModel.findOne({ MenuName });
    if (exisitingMenu) {
      return res.status(500).send({
        success: false,
        message: "The Name Of Menu Already Registered With This MenuName",
      });
    }
    //save menu
    const menu = await menuModel({
      MenuName,
      Categlory,
      Price,
      ImageURL,
      Priority,
      createBy: req.auth._id,
    }).save();
    return res.status(201).send({
      success: true,
      message: "Create Menu Successfull",
      menu,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Create Menu API",
      error,
    });
  }
};
//updateMenu
const updateMenuController = async (req, res) => {
  try {
    const { MenuName, Categlory, Price, ImageURL } = req.body;
    //find user
    const menu = await menuModel.findOne({ MenuName });
    const updateMenu = await menuModel.findOneAndUpdate(
      { MenuName },
      {
        MenuName: MenuName || menu.MenuName,
        Categlory: Categlory || menu.Categlory,
        Price: Price || menu.Price,
        ImageURL: ImageURL || menu.ImageURL,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Menu Updated",
      updateMenu,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Menu Update Api",
      error,
    });
  }
};
// getmenu
const getMenuController = async (req, res) => {
  try {
    const menus = await menuModel
      .find()
      .populate("createBy", "_id name")
      .sort({ createdAt: -1 });
    if (!menus || menus.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No menu items found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Menu items retrieved successfully",
      menus: menus,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching menu items",
      error: error,
    });
  }
};

module.exports = {
  createMenuController,
  updateMenuController,
  getMenuController,
};
