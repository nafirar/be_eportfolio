const router = require("express").Router();
const Album = require("../models/Album");
const fileAlbum = require("../utils/fileAlbum");
const fs = require("fs");
const User = require("../models/User");
const DIR = "./";

//create image file album
router.post("/", fileAlbum("./storage/images"), async (req, res) => {
  try {
    const user = await User.findById(req.body.data.userId);
    if (!user) {
      return res.status(404).json("User not found!");
    }
    //If File have then push file into reqBody then process update
    var imgUrl = "";
    if (req.file) {
      imgUrl = `storage/images/${req.file.filename}`;
      req.body = JSON.parse(req.body.data);
    }
    req.body.fileAlbum = imgUrl;

    const newAlbum = new Album(req.body);
    const savedAlbum = await newAlbum.save();
    res.status(200).json(savedAlbum);
  } catch (err) {
    res.status(500).json(err);
  }
});

//create video file album
router.post("/video", fileAlbum("./storage/videos"), async (req, res) => {
  try {
    const user = await User.findById(req.body.data.userId);
    if (!user) {
      return res.status(404).json("User not found!");
    }
    //If File have then push file into reqBody then process update
    var imgUrl = "";
    if (req.file) {
      imgUrl = `storage/videos/${req.file.filename}`;
      req.body = JSON.parse(req.body.data);
    }
    req.body.fileAlbum = imgUrl;

    const newAlbum = new Album(req.body);
    const savedAlbum = await newAlbum.save();
    res.status(200).json(savedAlbum);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete file album
router.delete("/:id", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) {
      return res.status(404).json("File not found!");
    }
    if (album.userId === req.body.userId) {
      await Album.findByIdAndDelete(req.params.id);
      fs.unlinkSync(DIR + album.fileAlbum);

      res.status(200).json("Album deleted!");
    } else {
      res.status(403).json("You can only delete your album");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all file album by id user
router.get("/all/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json("User not found!");
    }
    const userAlbum = await Album.find({
      userId: req.params.id,
    }).sort({
      createdAt: "desc",
    });
    res.json(userAlbum);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
