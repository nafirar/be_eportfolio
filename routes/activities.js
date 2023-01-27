const router = require("express").Router();
const Activity = require("../models/Activity");
const User = require("../models/User");

//create activity
router.post("/", async (req, res) => {
  try {
    const newActivity = new Activity(req.body);
    const savedActivity = await newActivity.save();
    res.status(200).json(savedActivity);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update activity
router.put("/:id", async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json("Activity not found");
    }
    if (activity.userId === req.body.userId) {
      await activity.updateOne({ $set: req.body });
      res.status(200).json("Activity updated!");
    } else {
      res.status(403).json("You can only update your activity");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete activity
router.delete("/:id", async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json("Activity not found");
    }
    if (activity.userId === req.body.userId) {
      // await activity.deleteOne({ $set: req.body });
      await Activity.findByIdAndDelete(req.params.id);

      res.status(200).json("Activity deleted!");
    } else {
      res.status(403).json("You can only delete your activity");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//find activity
router.get("/:id", async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json("Activity not found");
    }
    res.status(200).json(activity);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all activity by id user
router.get("/all/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json("User not found!");
    }
    const userActivity = await Activity.find({ userId: req.params.id }).sort({
      createdAt: "desc",
    });
    res.json(userActivity);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get last activity by id user
router.get("/last/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json("User not found!");
    }
    const userActivity = await Activity.findOne({ userId: req.params.id }).sort(
      {
        startDate: "desc",
      }
    );
    res.json(userActivity);
  } catch (err) {
    res.status(500).json(err);
  }
});

// search activities by query
router.get("/search/:search", async (req, res) => {
  try {
    var activities = await Activity.find({
      $or: [
        { desc: { $regex: req.params.search, $options: "i" } },
        { title: { $regex: req.params.search, $options: "i" } },
      ],
    }).sort({
      createdAt: "desc",
    });

    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
