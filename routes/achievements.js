const router = require("express").Router();
const Achievement = require("../models/Achievement");
const imgAchievement = require("../utils/imgAchievement");
const fs = require("fs");
const DIR = "./";

//create achievement
router.post("/", imgAchievement("./storage/images"), async (req, res) => {
  //If File have then push file into reqBody then process update
  var imgUrl = "";
  if (req.file) {
    imgUrl = `storage/images/${req.file.filename}`;
    req.body = JSON.parse(req.body.data);
  }
  req.body.imgAchievement = imgUrl;

  const newAchievement = new Achievement(req.body);
  try {
    const savedAchievement = await newAchievement.save();
    res.status(200).json(savedAchievement);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update achievement
router.put("/:id", imgAchievement("./storage/images"), async (req, res) => {
  //If File have then push file into reqBody then process update
  var imgUrl = "";
  if (req.file) {
    imgUrl = `storage/images/${req.file.filename}`;
    req.body = JSON.parse(req.body.data);
  }
  req.body.imgAchievement = imgUrl;

  const achievement = await Achievement.findById(req.params.id);
  try {
    //Check user have photo/image. if had then first delete local file then database
    const achievementPhotoInfo = achievement.imgAchievement;
    // kalau udah ada foto tapi gak update foto
    if (achievementPhotoInfo && imgUrl == "") {
      req.body.imgAchievement = achievementPhotoInfo;
    }
    // kalau udah ada foto dan update foto
    else if (achievementPhotoInfo && imgUrl != "") {
      fs.unlinkSync(DIR + achievementPhotoInfo);
    }

    if (achievement.userId === req.body.userId) {
      await achievement.updateOne({ $set: req.body });
      res.status(200).json("Achievement updated!");
    } else {
      res.status(500).json("You can only update your achievement!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete achievement
router.delete("/:id", async (req, res) => {
  const achievement = await Achievement.findById(req.params.id);
  try {
    if (achievement.userId === req.body.userId) {
      await Achievement.findByIdAndDelete(req.params.id);
      fs.unlinkSync(DIR + achievement.imgAchievement);

      res.status(200).json("Achievement deleted!");
    } else {
      res.status(500).json("You can only delete your achievement");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//find achievement
router.get("/:id", async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    res.status(200).json(achievement);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all achievement
router.get("/timeline/all", async (req, res) => {
  try {
    const userAchievement = await Achievement.find().sort({
      createdAt: "desc",
    });
    res.json(userAchievement);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all achievement by id user
router.get("/all/:id", async (req, res) => {
  try {
    const userAchievement = await Achievement.find({
      userId: req.params.id,
    }).sort({
      createdAt: "desc",
    });
    res.json(userAchievement);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get last achievement by id user
router.get("/last/:id", async (req, res) => {
  try {
    const userAchievement = await Achievement.findOne({
      userId: req.params.id,
    }).sort({
      createdAt: "desc",
    });
    res.json(userAchievement);
  } catch (err) {
    res.status(500).json(err);
  }
});

// search achievements by query
router.get("/search/:search/", async (req, res) => {
  try {
    var achievements = await Achievement.find({
      desc: { $regex: req.params.search, $options: "i" },
    }).sort({
      createdAt: "desc",
    });

    res.status(200).json(achievements);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
