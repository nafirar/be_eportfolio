const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
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
      imgUrl = `storage/images/${req.file.filename}`;
    }
    req.body.profilePicture = imgUrl;

    try {
      //Check user have photo/image. if had then first delete local file then database
      const userInfo = await User.findById(id);
      const userPhotoInfo = userInfo.profilePicture;
      // kalau udah ada foto tapi gak update foto
      if (userPhotoInfo && imgUrl == "") {
        req.body.profilePicture = userPhotoInfo;
      }
      // kalau udah ada foto dan update foto
      else if (userPhotoInfo && imgUrl != "") {
        fs.unlinkSync(DIR + userPhotoInfo);
      }

      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
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

// search users by query
router.get("/search/:id/:name", async (req, res) => {
  try {
    var users = await User.find({
      username: { $regex: req.params.name, $options: "i" },
      dateBirth: { $ne: null },
    }).sort({ username: "asc" });
    let temp = [];
    users.forEach((user) => {
      temp.push(user._id);
    });
    users = temp;
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all users
router.get("/all/:id", async (req, res) => {
  try {
    var allUsers = await User.find({ gender: { $ne: null } }).sort({
      username: "asc",
    });
    let temp = [];
    allUsers.forEach((user) => {
      temp.push(user._id);
    });
    allUsers = temp;
    res.json(allUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// follow user
router.put("/follow/:id", async (req, res) => {
  try {
    // tambah following di user yang ngefollow
    const userFollowing = await User.findById(req.body.userIdFollowing);
    userFollowingFollowing = userFollowing.following;
    userFollowingFollowing.push(req.params.id);
    await userFollowing.updateOne({
      $set: { following: userFollowingFollowing },
    });

    // tambah followers di user yang difollow
    const userFollowed = await User.findById(req.params.id);
    userFollowedFollowers = userFollowed.followers;
    userFollowedFollowers.push(req.body.userIdFollowing);
    await userFollowed.updateOne({
      $set: { followers: userFollowedFollowers },
    });

    res.status(200).json({ userFollowing, userFollowed });
  } catch (err) {
    res.status(500).json(err);
  }
});

// unfollow user
router.put("/unfollow/:id", async (req, res) => {
  try {
    // hapus following di user yang ngefollow
    const userFollowing = await User.findById(req.body.userIdFollowing);
    userFollowingFollowing = userFollowing.following;
    userFollowingFollowing = userFollowingFollowing.filter(
      (e) => e !== req.params.id
    );
    await userFollowing.updateOne({
      $set: { following: userFollowingFollowing },
    });

    // hapus followers di user yang difollow
    const userFollowed = await User.findById(req.params.id);
    userFollowedFollowers = userFollowed.followers;
    userFollowedFollowers = userFollowedFollowers.filter(
      (e) => e !== req.body.userIdFollowing
    );
    await userFollowed.updateOne({
      $set: { followers: userFollowedFollowers },
    });

    res.status(200).json({ userFollowing, userFollowed });
  } catch (err) {
    res.status(500).json(err);
  }
});

// temporarily for mobile
router.get("/mobile/all", async (req, res) => {
  try {
    const userAll = await User.find();
    res.json(userAll);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
