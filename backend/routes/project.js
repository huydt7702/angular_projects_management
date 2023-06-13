const router = require("express").Router();
const config = require("../config");
const Project = require("../models/project");
const { verifyLeader } = require("../controllers/verifyLeader");

router.post("/", verifyLeader, async (req, res, next) => {
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

router.put("/:id", verifyLeader, async (req, res, next) => {
    const projectExist = await Project.findById(req.params.id);

    if (!projectExist) {
        return res.status(404).json({
            success: false,
            message: "The project Not Found",
        });
    }

    let project = {
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        teamSize: req.body.teamSize,
        budget: req.body.budget,
        expense: req.body.expense,
        status: req.body.status,
    };

    try {
        project = await Project.findByIdAndUpdate(req.params.id, project, { new: true });

        res.json({
            success: true,
            data: project,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "The project cannot be updated",
            error: error,
        });
    }
});

router.delete("/:id", verifyLeader, async (req, res) => {
    Project.findByIdAndRemove(req.params.id)
        .then((project) => {
            if (project) {
                return res.status(200).json({
                    success: true,
                    message: "The project is deleted",
                });
            }

            return res.status(404).json({
                success: false,
                message: "The project with the given ID was not found",
            });
        })
        .catch((error) => {
            return res.status(500).json({
                success: false,
                message: "The project cannot be deleted",
                error: error,
            });
        });
});

module.exports = router;
