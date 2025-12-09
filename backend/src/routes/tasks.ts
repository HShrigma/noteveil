import { Router } from "express";
import { tempTasks } from "../data/tasks";

const router = Router();
let tasks = tempTasks;

router.get("/", (_req, res) => {
    res.json(tasks);
});

// Delete tasklist
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    tasks = tasks.filter(taskList => taskList.id !== id);

    res.json({success:true, deletedId: id});
});

// Delete task
router.delete("/:id/:taskId", (req, res) => {
    const listId = Number(req.params.id);
    const taskId = Number(req.params.taskId);
    
   const index = tasks.findIndex(t => t.id === listId);
    if (index === -1) {
        return res.status(404).json({ success: false, error: "TaskList not found" });
    }

    tasks[index].tasks = tasks[index].tasks.filter(t => t.id !== taskId);
    res.json({success:true, deletedId: listId, deletedTaskId: taskId});
});

// Add list
router.post("/list/:id", (req, res) => {
    const listId = Number(req.params.id);
    const {title} = req.body;

    tasks.push({ id: listId, title, tasks:[], nextId:undefined}); 

    res.json({success:true, listId, title});
});

// Add task
router.post("/task/:id", (req, res) => {
    const listId = Number(req.params.id);
    const index = tasks.findIndex(t => t.id === listId);

    if (index === -1) return res.status(404).json({ success: false, error: "TaskList not found" });

    const {taskId, label} = req.body;
    tasks[index].tasks.push({ id: taskId, label: label, done:false });

    res.json({success:true, listId, label});
});

// Update nextId
router.patch("/list/:id/next", (req,res) => {
    const listId = Number(req.params.id);
    const index = tasks.findIndex(t => t.id === listId);

    if (index === -1) return res.status(404).json({ success: false, error: "TaskList not found" });
    
    const {nextId} = req.body;

    if (nextId && !tasks.some(list => list.id === nextId)) return res.status(404).json({ success: false, error: `No id to reference found for id:${nextId}` });

    tasks[index].nextId = nextId;

    res.json({success:true, listId, nextId});
});

export default router;