const mongoose = require("mongoose");
const router = require("express").Router();

const ProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      max: 80,
    },
    desc: {
      type: String,
      required: true,
      max: 3000,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Profile", ProfileSchema);
