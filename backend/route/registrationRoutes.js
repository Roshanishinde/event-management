const express = require("express");
const router = express.Router();

const {
  registerEvent,
  getEventRegistrations,
  deleteRegistration
} = require("../controllers/registrationController");

router.post("/", registerEvent);
router.get("/:eventId", getEventRegistrations);
router.delete("/:id", deleteRegistration);

module.exports = router;