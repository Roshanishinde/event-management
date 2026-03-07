const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: String,
  eventType: String,
  date: String,
  venue: String,
  image: String
});

module.exports = mongoose.model("Event", eventSchema);