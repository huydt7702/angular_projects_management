const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
    {
        taskName: { type: String, required: true },
        projectName: { type: String, required: true },
        description: String,
        assignedTo: { type: Date, required: true },
        priority: { type: String, default: "Staff" },
        status: { type: String, default: "Progress" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
