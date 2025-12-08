import { Router } from "express";
import { tempTasks } from "../data/tasks";

const router = Router();
let tasks = tempTasks;

router.get("/", (_req, res) => {
    res.json(tasks);
});

// delete tasklist
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    tasks = tasks.filter(task => task.id !== id);

    res.json({success:true, deletedId: id});
});

// delete task
router.delete("/:id/:taskId", (req, res) => {
    const id = Number(req.params.id);
    const taskId = Number(req.params.taskId);

    tasks = tasks.filter(task => task.id !== id);

    res.json({success:true, deletedId: id, deletedTaskId: taskId});
});

export default router;