const express = require("express");
const router = express.Router();

const {
  getStudentProfile,
  updateStudentProfile
} = require("../controllers/studentController");


// GET PROFILE
router.get("/:username", getStudentProfile);


// UPDATE PROFILE
router.put("/:username", updateStudentProfile);

module.exports = router;