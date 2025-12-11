import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import { requireBodyFields, sanitizeInput, validateIdParam as validateIdParams } from "../utils/middleware";

const router = Router();
const controller = new TaskController();

router.get("/", (_req, res) => controller.getTasks(_req, res));

// Delete tasklist
router.delete(
    "/:id",
    validateIdParams(),
    (req, res) => controller.deleteTaskList(req, res)
);

// Delete task
router.delete(
    "/:id/:taskId",
    validateIdParams(true),
    (req, res) => controller.deleteTask(req, res)
);

// Add list
router.post(
    "/list/:id",
    validateIdParams(),
    sanitizeInput(),
    requireBodyFields(["title"]),
    (req, res) => controller.addTaskList(req, res)
);

// Add task
router.post(
    "/list/:id/task/:taskId",
    validateIdParams(true),
    sanitizeInput(),
    requireBodyFields(["label"]),
    (req, res) => controller.addTask(req, res)
);

// Update nextId
router.patch(
    "/list/:id/next",
    sanitizeInput(),
    validateIdParams(),
    (req, res) => controller.updateNextId(req, res)
);

// Update task done
router.patch(
    "/list/:id/task/:taskId/done",
    sanitizeInput(),
    validateIdParams(true),
    (req, res) => controller.updateTaskDone(req, res)
);

// Update task label
router.patch(
    "/list/:id/task/:taskId/label",
    sanitizeInput(),
    validateIdParams(true),
    requireBodyFields(["label"]),
    (req, res) => controller.updateTaskLabel(req, res)
);

// Update list title
router.patch(
    "/list/:id/title",
    sanitizeInput(),
    validateIdParams(),
    requireBodyFields(["title"]),
    (req, res) => controller.updateListTitle(req, res)
);

export default router;