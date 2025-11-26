import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["Pending", "In Progress", "Completed"],
            default: "Pending",
            required: true
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true
        },
        dueDate: {
            type: Date,
            required: true
        }
    },
    { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
