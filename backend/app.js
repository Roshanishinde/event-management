const express = require("express");
const cors = require("cors");
require("dotenv").config(); 
const connectDB = require("./config_temp/db");

const app = express();

// middleware
app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// DB connection
connectDB();

// routes
app.use("/api/events", require("./route/eventRoutes"));
app.use("/api/registrations", require("./route/registrationRoutes"));
app.use("/api/auth", require("./route/authRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});