const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//create post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update post
router.put("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post updated!");
    } else {
      res.status(500).json("You can only update your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete post
router.delete("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    if (post.userId === req.body.userId) {
      // await post.deleteOne({ $set: req.body });
      await Post.findByIdAndDelete(req.params.id);

      res.status(200).json("Post deleted!");
    } else {
      res.status(500).json("You can only delete your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//find post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
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

    const userPost = await Post.find({
      userId: { $in: userFollowingFollowing },
    }).sort({ createdAt: "desc" });
    res.json(userPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all post by id user
router.get("/all/:id", async (req, res) => {
  try {
    const userPost = await Post.find({ userId: req.params.id }).sort({
      createdAt: "desc",
    });
    res.json(userPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get last post by id user
router.get("/last/:id", async (req, res) => {
  try {
    const userPost = await Post.findOne({ userId: req.params.id }).sort({
      createdAt: "desc",
    });
    res.json(userPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// search posts by query
router.get("/search/:search/", async (req, res) => {
  try {
    var posts = await Post.find({
      desc: { $regex: req.params.search, $options: "i" },
    }).sort({
      createdAt: "desc",
    });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
