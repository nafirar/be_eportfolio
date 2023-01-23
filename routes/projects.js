const router = require("express").Router();
const Project = require("../models/Project");
const Album = require("../models/Album");

//create project
router.post("/", async (req, res) => {
  const newProject = new Project(req.body);
  try {
    const savedProject = await newProject.save();
    res.status(200).json(savedProject);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update project
router.put("/:id", async (req, res) => {
  const project = await Project.findById(req.params.id);
  try {
    if (project.userId === req.body.userId) {
      await project.updateOne({ $set: req.body });
      res.status(200).json("Project updated!");
    } else {
      res.status(500).json("You can only update your project");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete project
router.delete("/:id", async (req, res) => {
  const project = await Project.findById(req.params.id);
  try {
    if (project.userId === req.body.userId) {
      // await project.deleteOne({ $set: req.body });
      await Project.findByIdAndDelete(req.params.id);

      res.status(200).json("Project deleted!");
    } else {
      res.status(500).json("You can only delete your project");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//find project
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all project
router.get("/timeline/all", async (req, res) => {
  try {
    const userProject = await Project.find().sort({ createdAt: "desc" });
    res.json(userProject);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all project by id user
router.get("/all/:id", async (req, res) => {
  try {
    const userProject = await Project.find({ userId: req.params.id }).sort({
      createdAt: "desc",
    });
    res.json(userProject);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get last project by id user
router.get("/last/:id", async (req, res) => {
  try {
    const userProject = await Project.findOne({ userId: req.params.id }).sort({
      startDate: "desc",
    });
    res.json(userProject);
  } catch (err) {
    res.status(500).json(err);
  }
});

// search projects by query
router.get("/search/:search/", async (req, res) => {
  try {
    var projects = await Project.find({
      $or: [
        { desc: { $regex: req.params.search, $options: "i" } },
        { title: { $regex: req.params.search, $options: "i" } },
      ],
    }).sort({
      createdAt: "desc",
    });

    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
