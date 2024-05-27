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

// Fetch all user data
const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({}, { passWord: 0 }); // Exclude password field
    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    res.status(200).json({
      success: true,
      message: "All users retrieved successfully",
      users,
    });
  } catch (error) {
    console.error("Error fetching all users:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching all users",
      error: error.message,
    });
  }
};

//register
const registerController = async (req, res) => {
  try {
    const {
      userName,
      userSurname,
      userBirthday,
      userEmail,
      userId,
      passWord,
      role,
    } = req.body;
    // Validation
    if (
      !userName ||
      !userSurname ||
      !userBirthday ||
      !userEmail ||
      !userId ||
      !passWord ||
      !role
    ) {
      return res.status(400).send({
        success: false,
        message: "All required fields are mandatory",
      });
    }
    const existingUser = await userModel.findOne({ userId });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User with this userId already exists",
      });
    }
    const hashedPassword = await hashPassword(passWord);

    const newUser = await userModel.create({
      userName,
      userSurname,
      userBirthday,
      userEmail,
      userId,
      role,
      passWord: hashedPassword,
    });

    return res.status(201).send({
      success: true,
      message: "Registration successful",
      user: newUser,
    });
  } catch (error) {
    console.error("Error in registerController:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
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

// Update user points after successful redemption
const updateUserPointsController = async (req, res) => {
  try {
    const { userId, pointsToDeduct } = req.body;

    // Find user by userId
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Validate if user has enough points
    if (user.point < pointsToDeduct) {
      return res.status(400).json({
        success: false,
        message: "Insufficient points",
      });
    }

    // Deduct points from user's balance
    user.point -= pointsToDeduct;
    await user.save();

    // Send response
    res.status(200).json({
      success: true,
      message: `User points updated successfully. Remaining points: ${user.point}`,
      user: user,
    });
  } catch (error) {
    console.error("Error updating user points:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating user points",
      error: error.message,
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
// Update user status by ID
const updateUserStatusController = async (req, res) => {
  try {
    const { userId, status } = req.body;
    // Find user by userId
    const user = await userModel.findOne({ userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update user status
    user.status = status;
    await user.save();

    // Send response
    res.status(200).json({
      success: true,
      message: `User status updated to ${status}`,
      user: user,
    });
  } catch (error) {
    console.error("Error updating user status:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating user status",
      error: error.message,
    });
  }
};

module.exports = {
  requireSignIn,
  registerController,
  loginController,
  updateUserController,
  getUserController,
  getAllUsersController,
  updateUserStatusController,
  updateUserPointsController,
};
