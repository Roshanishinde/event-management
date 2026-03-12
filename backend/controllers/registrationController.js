const Registration = require("../models/registrationModel");

// Register for event
exports.registerEvent = async (req, res) => {
  try {
    const reg = new Registration(req.body);
    await reg.save();
    res.json(reg);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get registrations for a specific event
exports.getEventRegistrations = async (req, res) => {
  try {
    const data = await Registration.find({ eventId: req.params.eventId });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete registration
exports.deleteRegistration = async (req, res) => {
  try {
    const deleted = await Registration.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.json({ message: "Registration deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};