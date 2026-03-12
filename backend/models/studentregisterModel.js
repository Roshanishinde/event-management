const mongoose = require("mongoose");

const studentregisterSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  eventImage: {
    type: String,
    default: "",
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    required: true,
  },
  division: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  paymentProof: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "Pending",
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.studentregister ||
  mongoose.model("studentregister", studentregisterSchema);