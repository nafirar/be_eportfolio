const mongoose = require("mongoose");
//const {ObjectId} = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    nim: {
      type: String,
      default: "",
    },
    major: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    dateBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    interest: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "",
    },
    socialMedia: {
      instagram: {
        type: String,
        default: "",
      },
      linkedin: {
        type: String,
        default: "",
      },
      twitter: {
        type: String,
        default: "",
      },
      github: {
        type: String,
        default: "",
      },
    },
    skill: [
      {
        type: String,
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
