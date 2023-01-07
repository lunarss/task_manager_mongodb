const router = require("express").Router();
const Task = require("../models").taskModel;
const taskValidation = require("../validation").taskValidation;

// middleware
router.use((req, res, next) => {
  console.log("Task request incoming...");
  next();
});

// get all tasks in database
router.get("/", (req, res) => {
  Task.find({})
    .populate("user", ["username", "email"])
    .then((task) => {
      res.send(task);
    })
    .catch(() => {
      res.status(500).send("Cannot get task.");
    });
});

// get task by task id
router.get("/:_id", (req, res) => {
  let { _id } = req.params;
  Task.findOne({ _id })
    .populate("user", ["email"])
    .then((task) => {
      res.send(task);
    })
    .catch((err) => {
      res.send(err);
    });
});

// get task by task uuid
router.get("/uuid/:id", (req, res) => {
  let { id } = req.params;
  Task.findOne({ id })
    .populate("user", ["email"])
    .then((task) => {
      res.send(task);
    })
    .catch((err) => {
      res.send(err);
    });
});

// get all tasks of the current login user
router.get("/user/:_id", (req, res) => {
  Task.find({ user: req.user })
    .then((task) => {
      res.send(task);
    })
    .catch(() => {
      res.status(500).send("Cannot get task.");
    });
});

// create a new task
router.post("/", async (req, res) => {
  // validate inputs
  const { error } = taskValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let { id, content, date, isComplete } = req.body;
  let newTask = new Task({
    id,
    content,
    date,
    isComplete,
    user: req.user._id,
  });
  try {
    await newTask.save();
    res.status(200).send("New task has been saved.");
  } catch (err) {
    res.status(400).send("Cannot save task.");
  }
});

// update a task by task id
router.patch("/:_id", async (req, res) => {
  // validate inputs
  const { error } = taskValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let { _id } = req.params;
  let task = await Task.findOne({ _id });
  if (!task) {
    res.status(404);
    return res.json({
      success: false,
      message: "Task not found.",
    });
  }

  if (task.user.equals(req.user._id)) {
    Task.findOneAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then(() => {
        res.send("Task updated.");
      })
      .catch((e) => {
        res.send({ success: false, message: e });
      });
  } else {
    res.status(403);
    return res.json({
      success: false,
      message: "Wrong user request.",
    });
  }
});

// delete a task by task id
router.delete("/:_id", async (req, res) => {
  let { _id } = req.params;
  let task = await Task.findOne({ _id });
  if (!task) {
    res.status(404);
    return res.json({
      success: false,
      message: "Task not found.",
    });
  }

  if (task.user.equals(req.user._id)) {
    Task.deleteOne({ _id })
      .then(() => {
        res.send("Task deleted.");
      })
      .catch((e) => {
        res.send({ success: false, message: e });
      });
  } else {
    res.status(403);
    return res.json({
      success: false,
      message: "Wrong user request.",
    });
  }
});

module.exports = router;
