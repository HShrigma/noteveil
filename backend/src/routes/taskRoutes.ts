import { Router } from "express";
import { TaskController } from "../controllers/taskController";

const router = Router();
const controller = new TaskController();

router.get("/", (_req, res) => controller.getTasks(_req, res));

// Delete tasklist
router.delete("/:id", (req, res) => controller.deleteTaskList(req, res));

// Delete task
router.delete("/:id/:taskId", (req, res) => controller.deleteTask(req, res));

// Add list
router.post("/list/:id", (req, res) => controller.addTaskList(req,res));

// Add task
router.post("/list/:listId/task/:taskId", (req, res) => controller.addTask(req,res));

// Update nextId
router.patch("/list/:id/next", (req,res) => controller.UpdateNextId(req,res));

// Update task done
router.patch("/list/:listId/task/:taskId/done", (req, res) => controller.UpdateTaskDone(req, res));

// Update task label
router.patch("/list/:listId/task/:taskId/label", (req, res) => controller.UpdateTaskLabel(req, res));

// Update list title
router.patch("/list/:listId/title", (req, res) => controller.UpdateListTitle(req, res));

export default router;