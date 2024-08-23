const mongoose = require("mongoose");

const socialmediaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Avatar: {
    // Corrected field name
    public_id: String,
    url: String,
  },
  description: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Array,
    default: [],
  },
});

// Use singular name for the model
const SocialMedia = mongoose.model("SocialMedia", socialmediaSchema);

module.exports = SocialMedia;
