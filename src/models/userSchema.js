const mongoose = require("mongoose");

const userRegistration = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
  profile: {
    type: String,
    required: false,
    default: "http://localhost:7000/defaultProfile.jpg",
  },
});

const registeredUser = mongoose.model("user", userRegistration);
module.exports = registeredUser;
