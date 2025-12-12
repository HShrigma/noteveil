import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import { runMiddleware } from "../utils/middleware";

const router = Router();
const controller = new TaskController();

router.get("/", runMiddleware({}), (_req, res) => controller.getTasks(_req, res));

// Delete tasklist
router.delete(
    "/:id",
    runMiddleware({idFields:["id"]}),
    (req, res) => controller.deleteTaskList(req, res)
);

// Delete task
router.delete(
    "/task/:taskId",
    runMiddleware({ idFields: ["taskId"]}),
    (req, res) => controller.deleteTask(req, res)
);

// Add list
router.post(
    "/",
    runMiddleware({ bodyFields: ["title"] }),
    (req, res) => controller.addTaskList(req, res)
);

// Add task
router.post(
    "/:id/task",
    runMiddleware({ idFields: ["id"], bodyFields: ["label"] }),
    (req, res) => controller.addTask(req, res)
);

// Update nextId
router.patch(
    "/:id/next",
    runMiddleware({ idFields: ["id"]}),
    (req, res) => controller.updateNextId(req, res)
);

// Update task done
router.patch(
    "/task/:taskId/done",
    runMiddleware({ idFields: ["taskId"] }),
    (req, res) => controller.updateTaskDone(req, res)
);

// Update task label
router.patch(
    "/task/:taskId/label",
    runMiddleware({idFields: ["taskId"], bodyFields:["label"]}),
    (req, res) => controller.updateTaskLabel(req, res)
);

// Update list title
router.patch(
    "/:id/title",
    runMiddleware({ idFields: ["id"], bodyFields:["title"]}),
    (req, res) => controller.updateListTitle(req, res)
);

export default router;