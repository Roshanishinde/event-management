const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config_temp/db");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

connectDB();

app.use("/api/events", require("./route/eventRoutes"));
app.use("/api/auth", require("./route/authRoutes"));
app.use("/api/registrations", require("./route/studentRegisterRoutes"));
app.use("/api/students", require("./route/studentRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});