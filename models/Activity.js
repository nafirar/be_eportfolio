const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema(
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
    type: {
      type: String,
      enum: ["academic", "non-academic"],
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    desc: {
      type: String,
      required: true,
      max: 500,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", ActivitySchema);
