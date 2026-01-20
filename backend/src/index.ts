import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import projectsRouter from "./routes/projectRoutes";
import tasksRouter from "./routes/taskRoutes";
import notesRouter from "./routes/noteRoutes";
import DB from "./config/db";
import dotenv from "dotenv";
const app = express();

dotenv.config();

const PORT = Number(process.env.PORT);
const CLIENT = process.env.CLIENT;
export const GOOGLE_ID = process.env.GOOGLE_CLIENT_ID;
export const AUTH_ROUTE = process.env.AUTH_ROUTE;
export const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

DB.getInstance();

app.use(cors({ origin: CLIENT}));
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