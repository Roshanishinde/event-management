const express = require("express");
const router = express.Router();
const controller = require("../controllers/studentregisterController");

router.post("/", controller.registerStudent);
router.get("/", controller.getRegistrations);
router.get("/user/:username", controller.getUserRegistrations);
router.get("/event/:eventId", controller.getEventRegistrations);
router.put("/:id", controller.updateStatus);
router.delete("/:id", controller.deleteRegistration);

module.exports = router;