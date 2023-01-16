const router = require("express").Router();
const Album = require("../models/Album");
const fileAlbum = require("../utils/fileAlbum");
const fs = require("fs");
const DIR = "./";

//create file album
router.post("/", fileAlbum("./storage/images"), async (req, res) => {
  //If File have then push file into reqBody then process update
  var imgUrl = "";
  if (req.file) {
    imgUrl = `storage/images/${req.file.filename}`;
    req.body = JSON.parse(req.body.data);
  }
  req.body.fileAlbum = imgUrl;

  const newAlbum = new Album(req.body);
  try {
    const savedAlbum = await newAlbum.save();
    res.status(200).json(savedAlbum);
  } catch (err) {
    res.status(500).json(err);
  }
});

//create video file album
router.post("/video", fileAlbum("./storage/videos"), async (req, res) => {
  //If File have then push file into reqBody then process update
  var imgUrl = "";
  if (req.file) {
    imgUrl = `storage/videos/${req.file.filename}`;
    req.body = JSON.parse(req.body.data);
  }
  req.body.fileAlbum = imgUrl;

  const newAlbum = new Album(req.body);
  try {
    const savedAlbum = await newAlbum.save();
    res.status(200).json(savedAlbum);
  } catch (err) {
    res.status(500).json(err);
  }
});

//create document file album
router.post("/document", fileAlbum("./storage/documents"), async (req, res) => {
  //If File have then push file into reqBody then process update
  var imgUrl = "";
  if (req.file) {
    imgUrl = `storage/documents/${req.file.filename}`;
    req.body = JSON.parse(req.body.data);
  }
  req.body.fileAlbum = imgUrl;

  const newAlbum = new Album(req.body);
  try {
    const savedAlbum = await newAlbum.save();
    res.status(200).json(savedAlbum);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update file album
router.put("/:id", fileAlbum("./storage/images"), async (req, res) => {
  //If File have then push file into reqBody then process update
  var imgUrl = "";
  if (req.file) {
    imgUrl = `storage/images/${req.file.filename}`;
    req.body = JSON.parse(req.body.data);
  }
  req.body.fileAlbum = imgUrl;

  const album = await Album.findById(req.params.id);
  try {
    //Check user have photo/image. if had then first delete local file then database
    const albumPhotoInfo = album.fileAlbum;
    // kalau udah ada foto tapi gak update foto
    if (albumPhotoInfo && imgUrl == "") {
      req.body.fileAlbum = albumPhotoInfo;
    }
    // kalau udah ada foto dan update foto
    else if (albumPhotoInfo && imgUrl != "") {
      fs.unlinkSync(DIR + albumPhotoInfo);
    }

    if (album.userId === req.body.userId) {
      await album.updateOne({ $set: req.body });
      res.status(200).json("Album updated!");
    } else {
      res.status(500).json("You can only update your album!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete file album
router.delete("/:id", async (req, res) => {
  const album = await Album.findById(req.params.id);
  try {
    if (album.userId === req.body.userId) {
      await Album.findByIdAndDelete(req.params.id);
      fs.unlinkSync(DIR + album.fileAlbum);

      res.status(200).json("Album deleted!");
    } else {
      res.status(500).json("You can only delete your album");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//find file album
router.get("/:id", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all file album
router.get("/timeline/all", async (req, res) => {
  try {
    const userAlbum = await Album.find().sort({
      createdAt: "desc",
    });
    res.json(userAlbum);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all file album by id user
router.get("/all/:id", async (req, res) => {
  try {
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

// get last file album by id user
router.get("/last/:id", async (req, res) => {
  try {
    const userAlbum = await Album.findOne({
      userId: req.params.id,
    }).sort({
      createdAt: "desc",
    });
    res.json(userAlbum);
  } catch (err) {
    res.status(500).json(err);
  }
});

// search file album by query
router.get("/search/:search/", async (req, res) => {
  try {
    var album = await Album.find({
      desc: { $regex: req.params.search, $options: "i" },
    }).sort({
      createdAt: "desc",
    });

    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
