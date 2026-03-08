const Registration = require("../models/registrationModel");

exports.registerEvent = async (req, res) => {
  const reg = new Registration(req.body);
  await reg.save();
  res.json(reg);
};

exports.getEventRegistrations = async (req, res) => {
  const data = await Registration.find({ eventId: req.params.eventId });
  res.json(data);
};