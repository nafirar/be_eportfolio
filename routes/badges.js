const router = require("express").Router();
const Badge = require("../models/Badge");

//create badge
router.post("/", async (req, res) => {
  const newBadge = new Badge(req.body);
  try {
    const savedBadge = await newBadge.save();
    res.status(200).json(savedBadge);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update badge
router.put("/:id", async (req, res) => {
  const badge = await Badge.findById(req.params.id);
  try {
    if (badge.userId === req.body.userId) {
      await badge.updateOne({ $set: req.body });
      res.status(200).json("Badge updated!");
    } else {
      res.status(500).json("You can only update your badge!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete badge
router.delete("/:id", async (req, res) => {
  const badge = await Badge.findById(req.params.id);
  try {
    if (badge.userId === req.body.userId) {
      await Badge.findByIdAndDelete(req.params.id);

      res.status(200).json("Badge deleted!");
    } else {
      res.status(500).json("You can only delete your badge");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//find badge
router.get("/:id", async (req, res) => {
  try {
    const badge = await Badge.findById(req.params.id);
    res.status(200).json(badge);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all badge
router.get("/timeline/all", async (req, res) => {
  try {
    const userBadge = await Badge.find().sort({
      createdAt: "desc",
    });
    res.json(userBadge);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all badge by id user
router.get("/all/:id", async (req, res) => {
  try {
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

// get last badge by id user
router.get("/last/:id", async (req, res) => {
  try {
    const userBadge = await Badge.findOne({
      userId: req.params.id,
    }).sort({
      createdAt: "desc",
    });
    res.json(userBadge);
  } catch (err) {
    res.status(500).json(err);
  }
});

// search badges by query
router.get("/search/:search/", async (req, res) => {
  try {
    var badges = await Badge.find({
      desc: { $regex: req.params.search, $options: "i" },
    }).sort({
      createdAt: "desc",
    });

    res.status(200).json(badges);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
