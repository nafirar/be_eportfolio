const router = require("express").Router();
const Article = require("../models/Article");
const coverArticle = require("../utils/coverArticle");
const fs = require("fs");
const DIR = "./";

//create
router.post("/", coverArticle("./storage/images"), async (req, res) => {
  //If File have then push file into reqBody then process update
  var imgUrl = "";
  if (req.file) {
    imgUrl = `storage/images/${req.file.filename}`;
    req.body = JSON.parse(req.body.data);
  }
  req.body.coverArticle = imgUrl;

  const newArticle = new Article(req.body);
  try {
    const savedArticle = await newArticle.save();
    res.status(200).json(savedArticle);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update
router.put("/:id", coverArticle("./storage/images"), async (req, res) => {
  //If File have then push file into reqBody then process update
  var imgUrl = "";
  if (req.file) {
    imgUrl = `storage/images/${req.file.filename}`;
    req.body = JSON.parse(req.body.data);
  }
  req.body.coverArticle = imgUrl;

  const article = await Article.findById(req.params.id);
  try {
    //Check user have photo/image. if had then first delete local file then database
    const articlePhotoInfo = article.coverArticle;
    // kalau udah ada foto tapi gak update foto
    if (articlePhotoInfo && imgUrl == "") {
      req.body.coverArticle = articlePhotoInfo;
    }
    // kalau udah ada foto dan update foto
    else if (articlePhotoInfo && imgUrl != "") {
      fs.unlinkSync(DIR + articlePhotoInfo);
    }

    if (article.userId === req.body.userId) {
      await article.updateOne({ $set: req.body });
      res.status(200).json("Article updated!");
    } else {
      res.status(500).json("You can only update your article!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  try {
    if (article.userId === req.body.userId) {
      await Article.findByIdAndDelete(req.params.id);
      fs.unlinkSync(DIR + article.coverArticle);

      res.status(200).json("Article deleted!");
    } else {
      res.status(500).json("You can only delete your article");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//find article
router.get("/:id", async (req, res) => {
  try {
    const post = await Article.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all article by id user
router.get("/all/:id", async (req, res) => {
  try {
    const userArticle = await Article.find({ userId: req.params.id }).sort({
      createdAt: "desc",
    });
    res.json(userArticle);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all post
router.get("/timeline/all", async (req, res) => {
  try {
    const userArticle = await Article.find().sort({ createdAt: "desc" });
    res.json(userArticle);
  } catch (err) {
    res.status(500).json(err);
  }
});

// search articles by query
router.get("/search/:search", async (req, res) => {
  try {
    var articles = await Article.find({
      $or: [
        { desc: { $regex: req.params.search, $options: "i" } },
        { title: { $regex: req.params.search, $options: "i" } },
        { tags: { $regex: req.params.search, $options: "i" } },
      ],
    }).sort({
      createdAt: "desc",
    });
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
