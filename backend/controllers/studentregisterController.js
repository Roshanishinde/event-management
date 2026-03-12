const Registration = require("../models/studentregisterModel");

// register
exports.registerStudent = async (req, res) => {
  try {
    const existingRegistration = await Registration.findOne({
      user: req.body.user,
      eventId: String(req.body.eventId),
    });

    if (existingRegistration) {
      return res.status(400).json({
        message: "You have already registered for this event",
      });
    }

    const registration = new Registration({
      ...req.body,
      eventId: String(req.body.eventId),
    });

    await registration.save();

    res.status(201).json({
      message: "Registration successful",
      registration,
    });
  } catch (error) {
    console.error("registerStudent error:", error);
    res.status(500).json({
      message: "Server error while registering student",
      error: error.message,
    });
  }
};

// all registrations
exports.getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ registeredAt: -1 });
    res.json(registrations);
  } catch (error) {
    console.error("getRegistrations error:", error);
    res.status(500).json({
      message: "Server error while fetching registrations",
      error: error.message,
    });
  }
};

// student dashboard
exports.getUserRegistrations = async (req, res) => {
  try {
    const { username } = req.params;

    const registrations = await Registration.find({
      user: username,
    }).sort({ registeredAt: -1 });

    res.json(registrations);
  } catch (error) {
    console.error("getUserRegistrations error:", error);
    res.status(500).json({
      message: "Server error while fetching user registrations",
      error: error.message,
    });
  }
};

// admin event-wise students
exports.getEventRegistrations = async (req, res) => {
  try {
    const { eventId } = req.params;

    const registrations = await Registration.find({
      eventId: String(eventId),
    }).sort({ registeredAt: -1 });

    res.json(registrations);
  } catch (error) {
    console.error("getEventRegistrations error:", error);
    res.status(500).json({
      message: "Server error while fetching event registrations",
      error: error.message,
    });
  }
};

// approve/reject
exports.updateStatus = async (req, res) => {
  try {
    const updatedRegistration = await Registration.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updatedRegistration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.json(updatedRegistration);
  } catch (error) {
    console.error("updateStatus error:", error);
    res.status(500).json({
      message: "Server error while updating status",
      error: error.message,
    });
  }
};

// delete
exports.deleteRegistration = async (req, res) => {
  try {
    const deletedRegistration = await Registration.findByIdAndDelete(req.params.id);

    if (!deletedRegistration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.json({ message: "Registration deleted successfully" });
  } catch (error) {
    console.error("deleteRegistration error:", error);
    res.status(500).json({
      message: "Server error while deleting registration",
      error: error.message,
    });
  }
};