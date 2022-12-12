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
    },
    nim: {
      type: String,
    },
    major: {
      type: String,
    },
    city: {
      type: String,
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
    },
    about: {
      type: String,
    },
    socialMedia: {
      linkedin: {
        type: String,
      },
      github: {
        type: String,
      },
      instagram: {
        type: String,
      },
      facebook: {
        type: String,
      },
      twitter: {
        type: String,
      },
    },
    skill: [
      {
        type: String,
      },
    ],
    role: {
      type: String,
      enum: ["dosen", "mahasiswa"],
    },
    blockProfile: [
      {
        type: Object,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
