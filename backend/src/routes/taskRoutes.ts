import { Router } from "express";
import  TaskController   from "../controllers/taskController";
import { runMiddleware } from "../utils/middleware";

const router = Router();

// Delete tasklist
router.delete(
    "/:id",
    runMiddleware({ auth: true, idFields: ["id"] }),
    (req, res) => TaskController.deleteTaskList(req, res)
);

// Delete task
router.delete(
    "/task/:taskId",
    runMiddleware({ auth: true, idFields: ["taskId"] }),
    (req, res) => TaskController.deleteTask(req, res)
);


// Add task
router.post(
    "/:id/task",
    runMiddleware({ auth: true, idFields: ["id"], bodyFields: ["label"] }),
    (req, res) => TaskController.addTask(req, res)
);

// Update nextId
router.patch(
    "/:id/next",
    runMiddleware({ auth: true, idFields: ["id"] }),
    (req, res) => TaskController.updateNextId(req, res)
);

// Update task done
router.patch(
    "/task/:taskId/done",
    runMiddleware({ auth: true, idFields: ["taskId"] }),
    (req, res) => TaskController.updateTaskDone(req, res)
);

// Update task label
router.patch(
    "/task/:taskId/label",
    runMiddleware({ auth: true, idFields: ["taskId"], bodyFields: ["label"] }),
    (req, res) => TaskController.updateTaskLabel(req, res)
);

// Update list title
router.patch(
    "/:id/title",
    runMiddleware({ auth: true, idFields: ["id"], bodyFields: ["title"] }),
    (req, res) => TaskController.updateListTitle(req, res)
);

export default router;