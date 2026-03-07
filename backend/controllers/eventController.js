const Event = require("../models/eventModel");

exports.addEvent = async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.json(event);
};

exports.getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

exports.updateEvent = async (req, res) => {
  await Event.findByIdAndUpdate(req.params.id, req.body);
  res.send("Event Updated");
};

exports.deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.send("Event Deleted");
};