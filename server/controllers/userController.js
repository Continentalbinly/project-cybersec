const JWT = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
var { expressjwt: jwt } = require("express-jwt");

//middleware
const requireSignIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});
// Fetch user data by token
const getUserController = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    user.passWord = undefined;

    res.status(200).json({
      success: true,
      message: "User data retrieved successfully",
      user,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Error fetching user data",
        error: error.message,
      });
    }
  }
};

//register
const registerController = async (req, res) => {
  try {
    const { userName, userId, passWord } = req.body;
    //validation
    if (!userName) {
      return res.status(400).send({
        success: false,
        message: "userName is required",
      });
    }
    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "userId is required",
      });
    }
    if (!passWord || passWord.length < 6) {
      return res.status(400).send({
        success: false,
        message: "passWord is required and 6 character long",
      });
    }
    //exisiting user
    const exisitingUser = await userModel.findOne({ userId });
    if (exisitingUser) {
      return res.status(500).send({
        success: false,
        message: "User Already Registered With This userId",
      });
    }
    //hashed password
    const hashPassWord = await hashPassword(passWord);

    //save user
    const user = await userModel({
      userName,
      userId,
      passWord: hashPassWord,
    }).save();
    return res.status(201).send({
      success: true,
      message: "Registeration Successfull",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

//login
const loginController = async (req, res) => {
  try {
    const { userId, passWord } = req.body;
    //validation
    if (!userId || !passWord) {
      return res.status(500).send({
        success: false,
        message: "Please Provide userId or passWord",
      });
    }
    //find user
    const user = await userModel.findOne({ userId });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "userId Not Found",
      });
    }
    //match password
    const match = await comparePassword(passWord, user.passWord);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "invalid userId or passWord",
      });
    }
    //TOKEN JWT
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    //undeinfed password
    user.passWord = undefined;
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in login api",
      error,
    });
  }
};

//register user
const updateUserController = async (req, res) => {
  try {
    const { userName, userId, passWord } = req.body;
    //find user
    const user = await userModel.findOne({ userId });
    //password validate
    if (passWord && passWord.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is required and should be 6 charater long",
      });
    }
    const hashPassWord = passWord ? await hashPassword(passWord) : undefined;
    //update user
    const updateUser = await userModel.findOneAndUpdate(
      { userId },
      {
        userName: userName || user.userName,
        passWord: hashPassWord || user.passWord,
      },
      { new: true }
    );
    updateUser.passWord = undefined;
    res.status(200).send({
      success: true,
      message: "Profile Updated Please Login",
      updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In User Update Api",
      error,
    });
  }
};

module.exports = {
  requireSignIn,
  registerController,
  loginController,
  updateUserController,
  getUserController,
};
