import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import { requireBodyFields, runMiddleware, sanitizeInput, validateIdParam as validateIdParams } from "../utils/middleware";

const router = Router();
const controller = new TaskController();

router.get("/", runMiddleware({}), (_req, res) => controller.getTasks(_req, res));

// Delete tasklist
router.delete(
    "/:id",
    runMiddleware({validateId:true}),
    (req, res) => controller.deleteTaskList(req, res)
);

// Delete task
router.delete(
    "/:id/:taskId",
    runMiddleware({validateId: true,hasTaskId: true}),
    (req, res) => controller.deleteTask(req, res)
);

// Add list
router.post(
    "/list/:id",
    runMiddleware({ validateId: true, bodyFields: ["title"] }),
    (req, res) => controller.addTaskList(req, res)
);

// Add task
router.post(
    "/list/:id/task/:taskId",
    runMiddleware({ validateId: true, hasTaskId: true, bodyFields: ["label"] }),
    (req, res) => controller.addTask(req, res)
);

// Update nextId
router.patch(
    "/list/:id/next",
    runMiddleware({ validateId: true}),
    (req, res) => controller.updateNextId(req, res)
);

// Update task done
router.patch(
    "/list/:id/task/:taskId/done",
    runMiddleware({ validateId: true,hasTaskId: true }),
    (req, res) => controller.updateTaskDone(req, res)
);

// Update task label
router.patch(
    "/list/:id/task/:taskId/label",
    runMiddleware({validateId: true, hasTaskId: true, bodyFields:["label"]}),
    (req, res) => controller.updateTaskLabel(req, res)
);

// Update list title
router.patch(
    "/list/:id/title",
    runMiddleware({ validateId: true, bodyFields:["title"]}),
    (req, res) => controller.updateListTitle(req, res)
);

export default router;