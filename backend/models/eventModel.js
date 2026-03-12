const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: String,
  eventType: String,
  amount: String,
  date: String,
  time: String,
  venue: String,
  image: String,
  createdAt: Date
});
module.exports = mongoose.model("Event", eventSchema);