const router = require("express").Router();
const config = require("../config");
const Project = require("../models/project");

router.post("/", async (req, res, next) => {
    let project = new Project();

    project.name = req.body.name;
    project.startDate = req.body.startDate;
    project.endDate = req.body.endDate;
    project.teamSize = req.body.teamSize;
    project.budget = req.body.budget;
    project.expense = req.body.expense;
    project.status = req.body.status;

    try {
        project = await project.save();

        res.json({
            success: true,
            data: project,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "The project cannot be created",
            error: error,
        });
    }
});

router.get("/", async (req, res) => {
    const projects = await Project.find();

    if (!projects) {
        return res.status(500).json({
            success: false,
            message: "No project existed",
        });
    }

    res.json({
        success: true,
        data: projects,
    });
});

router.get("/:id", async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        return res.status(500).json({
            success: false,
            message: "The project with the given ID was not found",
        });
    }

    res.json({
        success: true,
        data: project,
    });
});

module.exports = router;
