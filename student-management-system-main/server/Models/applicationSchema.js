const mongoose = require("mongoose");
const validator = require("validator");

const applicationSchema = new mongoose.Schema({
  rollNumber: {
    type: String,
    trim: true,
    minLength: [10, "invalid Roll number"],
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "invalid First name"],
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "invalid Last name"],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email",
    },
  },
  role: {
    type: String,
    enum: ["HOD", "user", "staff", "student"],
    default: "user",
  },
  HodDepartment: {
    type: String,
    enum: ["CSE", "ECE", "DS", "IT", "EEE", "MECH", "CIVIL"],
    default: "Department not assigned",
  },
  status: {
    type: String,
    enum: ["Approved", "Denied", "Pending"],
    default: "Pending",
  },
  Id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Application = mongoose.model("Application's", applicationSchema);

module.exports = { Application };
