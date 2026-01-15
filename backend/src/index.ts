import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import projectsRouter from "./routes/projectRoutes";
import tasksRouter from "./routes/taskRoutes";
import notesRouter from "./routes/noteRoutes";
import DB from "./config/db";

const app = express();
const PORT = 4000;

DB.getInstance();

app.use(cors({ origin: "http://localhost:5173"}));
app.use(express.json());

// Routes
app.use("/api/users", userRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/tasks", tasksRouter);
app.use("/api/notes", notesRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
    DB.closeInstance();
    process.exit(0);
});