import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

import authRoutes from "./routes/auth.routes.js";
app.use("/api/auth", authRoutes);

import auth from "./middlewares/auth.middleware.js";
import employeeRoutes from "./routes/employee.routes.js";
import taskRoutes from "./routes/task.routes.js";

app.use("/api/employees", auth, employeeRoutes);
app.use("/api/tasks", auth, taskRoutes);

app.get("/", (req, res) => {
    res.send("Employee Task Forge API is running...");
});

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);
