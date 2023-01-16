const router = require("express").Router();
const Article = require("../models/Article");
const User = require("../models/User");

//create article
router.post("/", async (req, res) => {
  const newArticle = new Article(req.body);
  try {
    const savedArticle = await newArticle.save();
    res.status(200).json(savedArticle);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update article
router.put("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  try {
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
router.get("/timeline/all/:id", async (req, res) => {
  try {
    const userFollowing = await User.findById(req.params.id);
    userFollowingFollowing = userFollowing.following;
    userFollowingFollowing.push(req.params.id);

    const userArticle = await Article.find({
      userId: { $in: userFollowingFollowing },
    }).sort({ createdAt: "desc" });
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
