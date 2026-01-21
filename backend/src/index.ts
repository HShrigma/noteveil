import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import projectsRouter from "./routes/projectRoutes";
import tasksRouter from "./routes/taskRoutes";
import notesRouter from "./routes/noteRoutes";
import DB from "./config/db";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

const PORT = Number(process.env.PORT);
const CLIENT = process.env.CLIENT;

export const GOOGLE_ID = process.env.GOOGLE_CLIENT_ID;
export const AUTH_ROUTE = process.env.AUTH_ROUTE;
export const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

export const JWT_SECRET:jwt.Secret  = String(process.env.JWT_SECRET);
export const JWT_EXPIRES_IN_S = Number(process.env.JWT_EXPIRES_IN_S);

DB.getInstance();

app.use(cors({ origin: CLIENT, credentials: true }));
app.use(express.json());
app.use(cookieParser());

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