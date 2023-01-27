const router = require("express").Router();
const Badge = require("../models/Badge");
const User = require("../models/User");

//create badge
router.post("/", async (req, res) => {
  try {
    const newBadge = new Badge(req.body);
    const savedBadge = await newBadge.save();
    res.status(200).json(savedBadge);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update badge
router.put("/:id", async (req, res) => {
  try {
    const badge = await Badge.findById(req.params.id);
    if (!badge) {
      return res.status(404).json("Badge not found!");
    }
    if (badge.userId === req.body.userId) {
      await badge.updateOne({ $set: req.body });
      res.status(200).json("Badge updated!");
    } else {
      res.status(403).json("You can only update your badge!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete badge
router.delete("/:id", async (req, res) => {
  try {
    const badge = await Badge.findById(req.params.id);
    if (!badge) {
      return res.status(404).json("Badge not found!");
    }
    if (badge.userId === req.body.userId) {
      await Badge.findByIdAndDelete(req.params.id);

      res.status(200).json("Badge deleted!");
    } else {
      res.status(403).json("You can only delete your badge");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//find badge
router.get("/:id", async (req, res) => {
  try {
    const badge = await Badge.findById(req.params.id);
    if (!badge) {
      return res.status(404).json("Badge not found!");
    }
    res.status(200).json(badge);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all badge by id user
router.get("/all/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json("User not found!");
    }
    const userBadge = await Badge.find({
      userId: req.params.id,
    }).sort({
      createdAt: "desc",
    });
    res.json(userBadge);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
