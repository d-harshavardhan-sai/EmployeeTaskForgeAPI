import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

import employeeRoutes from "./routes/employee.routes.js";
app.use("/api/employees", employeeRoutes);

import taskRoutes from "./routes/task.routes.js";
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.send("Employee Task Forge API is running...");
});

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);
