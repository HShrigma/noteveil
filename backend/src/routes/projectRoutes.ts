import { Router } from "express";
import TaskController from "../controllers/taskController";
import NoteController from "../controllers/noteController";
import { runMiddleware } from "../utils/middleware";

const router = Router();
// ------------------ OWN ---------------

// ------------------ SHARED ---------------
// Get notes
router.get("/:id/notes", (_req, res) => NoteController.getNotes(_req, res));

// Get tasks
router.get("/:id/tasks", runMiddleware({}), (_req, res) => TaskController.getTasks(_req, res));

// Add list
router.post(
    "/:id/tasks",
    runMiddleware({ bodyFields: ["title"] }),
    (req, res) => TaskController.addTaskList(req, res)
);

// Add note
router.post("/:id/notes", runMiddleware({}), (req, res) => NoteController.addNote(req, res));

export default router;