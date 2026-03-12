const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true
  },

  firstName: {
    type: String
  },

  middleName: {
    type: String
  },

  lastName: {
    type: String
  },

  email: {
    type: String
  },

  contact: {
    type: String
  },

  className: {
    type: String
  },

  division: {
    type: String
  },

  password: {
    type: String
  },

  profileImage: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Student", studentSchema);