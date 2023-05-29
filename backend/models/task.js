const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
    {
        taskName: { type: String, required: true },
        projectName: { type: String, required: true },
        description: String,
        assignedTo: { type: String, required: true },
        priority: { type: String, default: "Normal" },
        status: { type: String, default: "Holding" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
