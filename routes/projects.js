const router = require("express").Router();
const Project = require("../models/Project");
const User = require("../models/User");

//create project
router.post("/", async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(200).json(savedProject);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update project
router.put("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json("Project not found");
    }
    if (
      project.userId === req.body.userId ||
      project.participants.includes(req.body.userId)
    ) {
      await project.updateOne({ $set: req.body });
      res.status(200).json("Project updated!");
    } else {
      res.status(403).json("You can only update your project");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete project
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json("Project not found");
    }
    if (project.userId === req.body.userId) {
      // await project.deleteOne({ $set: req.body });
      await Project.findByIdAndDelete(req.params.id);

      res.status(200).json("Project deleted!");
    } else {
      res.status(403).json("You can only delete your project");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//find project
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json("Project not found");
    }
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all project by id user
router.get("/all/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json("User not found!");
    }
    const userProject = await Project.find({
      $or: [{ userId: req.params.id }, { participants: req.params.id }],
    }).sort({
      createdAt: "desc",
    });
    res.json(userProject);
  } catch (err) {
    res.status(500).json(err);
  }
});

// search projects by query
router.get("/search/:search", async (req, res) => {
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

// project suggestion
router.get("/suggest/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json("User not found!");
    }
    const userProject = await Project.find({
      userId: { $ne: req.params.id },
      participants: { $ne: req.params.id },
      isPublic: true,
      endDate: null,
    })
      .sort({
        createdAt: "desc",
      })
      .limit(3);
    res.json(userProject);
  } catch (err) {
    res.status(500).json(err);
  }
});

// request participation
router.put("/request/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json("Project not found");
    }

    // tambah request
    let projectRequest = project.requests;
    projectRequest.push(req.body.userId);
    await project.updateOne({
      $set: { requests: projectRequest },
    });
    res.status(200).json("Project requested!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// cancel request participation
router.put("/cancelrequest/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json("Project not found");
    }

    // hapus request
    let projectRequest = project.requests;
    projectRequest = projectRequest.filter((e) => e !== req.body.userId);
    await project.updateOne({
      $set: { requests: projectRequest },
    });
    res.status(200).json("Project requested!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// accept request participation
router.put("/accept/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json("Project not found");
    }

    // hapus request
    let projectRequest = project.requests;
    projectRequest = projectRequest.filter((e) => e !== req.body.userId);

    // tambah participant
    let projectParticipants = project.participants;
    projectParticipants.push(req.body.userId);
    await project.updateOne({
      $set: { participants: projectParticipants, requests: projectRequest },
    });
    res.status(200).json("Participant added!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
