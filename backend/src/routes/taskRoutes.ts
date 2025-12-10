import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import { requireBodyFields } from "../utils/middleware";

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
router.patch("/list/:id/next", (req,res) => {controller.updateNextId(req, res)
});

// Update task done
router.patch("/list/:listId/task/:taskId/done",(req, res) => controller.updateTaskDone(req, res));

// Update task label
router.patch("/list/:listId/task/:taskId/label", requireBodyFields(["label"]), (req, res) => controller.updateTaskLabel(req, res));

// Update list title
router.patch("/list/:listId/title", requireBodyFields(["title"]), (req, res) => controller.updateListTitle(req, res));

export default router;