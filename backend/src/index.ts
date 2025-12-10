import express from "express";
import cors from "cors";
import tasksRouter from "./routes/taskRoutes";
import notesRouter from "./routes/noteRoutes";

const app = express();
const PORT = 4000;

app.use(cors({ origin: "http://localhost:5173"}));
app.use(express.json());

// Routes
app.use("/api/tasks", tasksRouter);
app.use("/api/notes", notesRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});