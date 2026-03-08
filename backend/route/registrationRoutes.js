const router = require("express").Router();
const controller = require("../controllers/registrationController");

router.post("/", controller.registerEvent);
router.get("/:eventId", controller.getEventRegistrations);

module.exports = router;