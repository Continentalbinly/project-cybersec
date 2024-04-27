const express = require("express");
const {createCourseController, getCoursesController} = require("../controllers/courseController");
//router object
const router = express.Router();

//Create
router.post("/createcourse", createCourseController);
//Fetch
router.get("/getcourse", getCoursesController);

//export
module.exports = router;