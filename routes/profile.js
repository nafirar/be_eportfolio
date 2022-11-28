const router = require("express").Router();
const { json } = require("express");
const Profile = require("../models/Profile");

//create profile
router.post("/", async (req, res) => {
  const newProfile = new Profile(req.body);
  try {
    const savedProfile = await newProfile.save();
    res.status(200).json(savedProfile);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update profile
router.put("/:id", async (req, res) => {
  const profile = await Profile.findById(req.params.id);
  try {
    if (profile.userId === req.body.userId) {
      await profile.updateOne({ $set: req.body });
      res.status(200).json("Profile updated!");
    } else {
      res.status(500).json("You can only update your profile");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete profile
router.delete("/:id", async (req, res) => {
  const profile = await Profile.findById(req.params.id);
  try {
    // if (profile.userId === req.body.userId) {
    // await profile.deleteOne({ $set: req.body });
    await Profile.findByIdAndDelete(req.params.id);

    res.status(200).json("Profile deleted!");
    // }
    //  else {
    //   res.status(500).json("You can only delete your profile");
    // }
  } catch (err) {
    res.status(500).json(err);
  }
});

//find profile
router.get("/:id", async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all profile by id user
router.get("/all/:id", async (req, res) => {
  try {
    const userProfile = await Profile.find({ userId: req.params.id }).sort({
      createdAt: "desc",
    });
    res.json(userProfile);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
