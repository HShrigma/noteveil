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
import path from "path";

const app = express();

dotenv.config();

const PORT = Number(process.env.PORT);
const CLIENT = process.env.CLIENT;

export const GOOGLE_ID = process.env.GOOGLE_CLIENT_ID;
export const AUTH_ROUTE = process.env.AUTH_ROUTE;
export const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

export const JWT_SECRET:jwt.Secret  = String(process.env.JWT_SECRET);
export const JWT_ACCESS_EXPIRES_IN_S = Number(process.env.JWT_ACCESS_EXPIRES_IN_S);
export const JWT_REFRESH_EXPIRES_IN_S = Number(process.env.JWT_REFRESH_EXPIRES_IN_S);

DB.getInstance();

app.use(cors({ origin: CLIENT, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/users", userRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/tasks", tasksRouter);
app.use("/api/notes", notesRouter);

//frontend
const frontendPath = path.join(__dirname, "../frontend");

app.use(express.static(frontendPath));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.get(/^(?!\/api).*/, (_, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

process.on('SIGINT', () => {
    DB.closeInstance();
    process.exit(0);
});