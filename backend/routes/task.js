const router = require("express").Router();
const config = require("../config");
const Task = require("../models/task");

router.post("/", async (req, res, next) => {
    let task = new Task();

    task.taskName = req.body.taskName;
    task.projectName = req.body.projectName;
    task.description = req.body.description;
    task.assignedTo = req.body.assignedTo;
    task.priority = req.body.priority;
    task.status = req.body.status;

    try {
        task = await task.save();

        res.json({
            success: true,
            data: task,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "The task cannot be created",
            error: error,
        });
    }
});

router.get("/", async (req, res) => {
    const tasks = await Task.find();

    if (!tasks) {
        return res.status(500).json({
            success: false,
            message: "No task existed",
        });
    }

    res.json({
        success: true,
        data: tasks,
    });
});

router.get("/:id", async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(500).json({
            success: false,
            message: "The task with the given ID was not found",
        });
    }

    res.json({
        success: true,
        data: task,
    });
});

module.exports = router;
