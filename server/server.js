const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const path = require('path');

//DOTENV
dotenv.config();

//MONGODB CONNECTION
connectDB();

//REST OBJECT
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// Serve static files from the build folder
app.use(express.static(path.join(__dirname, "build")));

// Route all requests to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

//ROUTES
app.use("/api/v1/auth", require("./routes/userRoutes"));

//PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Running ${PORT}`.bgGreen.white);
});
