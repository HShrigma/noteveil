import { Router } from "express";
import TaskController from "../controllers/taskController";
import NoteController from "../controllers/noteController";
import { runMiddleware } from "../utils/middleware";
import  ProjectController  from "../controllers/projectController";

const router = Router();
// ------------------ OWN ---------------

// Delete Project
router.delete("/:id", runMiddleware({idFields:["id"]}), (_req, res) => ProjectController.deleteProject(_req, res));


// Update Project title
router.patch("/:id", runMiddleware({ idFields: ["id"], bodyFields: ["title"] }), (_req, res) => ProjectController.updateProjectTitle(_req, res));

// ------------------ SHARED ---------------

// Get notes
router.get("/:id/notes", runMiddleware({idFields:["id"]}), (_req, res) => NoteController.getNotes(_req, res));

// Get tasks
router.get("/:id/tasks", runMiddleware({idFields:["id"]}), (_req, res) => TaskController.getTasks(_req, res));

// Add list
router.post(
    "/:id/tasks",
    runMiddleware({ idFields: ["id"], bodyFields: ["title"] }),
    (req, res) => TaskController.addTaskList(req, res)
);

// Add note
router.post("/:id/notes", runMiddleware({idFields:["id"]}), (req, res) => NoteController.addNote(req, res));

export default router;