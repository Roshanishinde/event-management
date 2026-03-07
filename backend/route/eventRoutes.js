const router = require("express").Router();
const controller = require("../controllers/eventController");

router.post("/", controller.addEvent);
router.get("/", controller.getEvents);
router.put("/:id", controller.updateEvent);
router.delete("/:id", controller.deleteEvent);

module.exports = router;