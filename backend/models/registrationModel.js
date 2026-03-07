const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  eventId: String,
  eventName: String,
  firstName: String,
  middleName: String,
  lastName: String,
  className: String,
  division: String,
  contact: String,
  email: String,
  registeredAt: String
});

module.exports = mongoose.model("Registration", registrationSchema);