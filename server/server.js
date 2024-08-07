const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const path = require("path");

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
app.use("/api/v1/course", require("./routes/courseRoutes"));
app.use("/api/v1/lesson", require("./routes/lessonRotes"));
app.use("/api/v1/task", require("./routes/taskRoutes"));
app.use("/api/v1/redeem", require("./routes/redeemRoutes"));
app.use("/api/v1/exam", require("./routes/examRoutes"));
app.use("/api/v1/certificate", require("./routes/certificateRoutes"));
app.use("/api/v1/redeemrequest", require("./routes/redeemRequestRoutes"));

//PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Running ${PORT}`.bgGreen.white);
});
