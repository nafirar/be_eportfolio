const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fileUpload = require("../utils/fileUpload");
const fs = require("fs");
const DIR = "./";

//hapus akun
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account deleted!");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You only can delete your account!");
  }
});

//update akun
router.put("/:id", fileUpload("./storage/images"), async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }

    const id = req.params.id;

    //If File have then push file into reqBody then process update
    var imgUrl = "";
    if (req.file) {
      var imgUrl = `storage/images/${req.file.filename}`;
    }
    req.body.profilePicture = imgUrl;

    try {
      //Check user have photo/image. if had then first delete local file then database
      const userInfo = await User.findById(id);
      const userPhotoInfo = userInfo.profilePicture;
      // kalau udah ada foto tapi gak update foto
      if (userPhotoInfo != "" && imgUrl == "") {
        req.body.profilePicture = userPhotoInfo;
      }
      // kalau udah ada foto dan update foto
      else if (userPhotoInfo != "" && imgUrl != "") {
        fs.unlinkSync(DIR + userPhotoInfo);
      }

      const user = await User.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        profilePicture: req.body.profilePicture,
      });

      res.status(200).json("Account updated!");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You only can update your account!");
  }
});

//cari akun
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc; //mengecualikan field password dan updatedAt
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
