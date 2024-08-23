const mongoose = require("mongoose");
const validator = require("validator");

const messageSchema = new mongoose.Schema({
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
  phone: {
    type: String,
    required: true,
    trim: true,
    minLength:[10,"invalid phone number"],
    maxlength:[10,"invalid phone number"]
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: [20, "Message must contain at least 20 characters"],
},


});

const Message = mongoose.model("Message",messageSchema);

module.exports = { Message };
