const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");

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

//ROUTES
app.use("/api/v1/auth", require("./routes/userRoutes"));
app.use("/api/v1/menu", require("./routes/menuRoutes"));
app.use("/api/v1/order", require("./routes/orderRoutes"));

//PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Running ${PORT}`.bgGreen.white);
});
