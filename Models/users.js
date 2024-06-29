const mongoose = require("mongoose");
const gender = require("../constants/gender");
const course = require("../constants/course");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  course: {
    type: String,
    enum: Object.values(course),
    default: course.Unknown,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  dob: {
    type: Date,
    default: null,
  },
  gender: {
    type: String,
    enum: Object.values(gender),
    lowercase: true,
    default: gender.Unknown,
    trim: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
