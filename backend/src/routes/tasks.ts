import { Router } from "express";
import { tempTasks } from "../data/tasks";

const router = Router();
let taskLists = tempTasks;

router.get("/", (_req, res) => {
    res.json(taskLists);
});

// Delete tasklist
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    taskLists = taskLists.filter(taskList => taskList.id !== id);

    res.json({success:true, deletedId: id});
});

// Delete task
router.delete("/:id/:taskId", (req, res) => {
    const listId = Number(req.params.id);
    const taskId = Number(req.params.taskId);
    
   const index = taskLists.findIndex(t => t.id === listId);
    if (index === -1) {
        return res.status(404).json({ success: false, error: "TaskList not found" });
    }

    taskLists[index].tasks = taskLists[index].tasks.filter(t => t.id !== taskId);
    res.json({success:true, deletedId: listId, deletedTaskId: taskId});
});

// Add list
router.post("/list/:id", (req, res) => {
    const listId = Number(req.params.id);
    const {title} = req.body;

    taskLists.push({ id: listId, title, tasks:[], nextId:undefined}); 

    res.json({success:true, listId, title});
});

// Add task
router.post("/list/:listId/task/:taskId", (req, res) => {
    const listId = Number(req.params.listId);
    const index = taskLists.findIndex(t => t.id === listId);

    if (index === -1) return res.status(404).json({ success: false, error: "TaskList not found" });

    const taskId = Number(req.params.taskId);
    const { label } = req.body;
    taskLists[index].tasks.push({ id: taskId, label: label, done: false });

    res.json({success:true, listId, label});
});

// Update nextId
router.patch("/list/:id/next", (req,res) => {
    const listId = Number(req.params.id);
    const index = taskLists.findIndex(t => t.id === listId);

    if (index === -1) return res.status(404).json({ success: false, error: "TaskList not found" });
    
    const {nextId} = req.body;

    if (nextId && !taskLists.some(list => list.id === nextId)) return res.status(404).json({ success: false, error: `No id to reference found for id:${nextId}` });

    taskLists[index].nextId = nextId;

    res.json({success:true, listId, nextId});
});

// Update task done
router.patch("/list/:listId/task/:taskId/done", (req, res) => {
    const listId = Number(req.params.listId);
    const index = taskLists.findIndex(t => t.id === listId);
    if (index === -1) return res.status(404).json({ success: false, error: "TaskList not found" });

    const taskId = Number(req.params.taskId);
    const taskIndex = taskLists[index].tasks.findIndex(t => t.id === taskId);
    if (taskId === -1) return res.status(404).json({ success: false, error: "Task not found" });

    const {done} = req.body;
    taskLists[index].tasks[taskIndex].done = done;

    res.json({success:true, listId, done});
});

// Update task label
router.patch("/list/:listId/task/:taskId/label", (req, res) => {
    const listId = Number(req.params.listId);
    const index = taskLists.findIndex(t => t.id === listId);
    if (index === -1) return res.status(404).json({ success: false, error: "TaskList not found" });

    const taskId = Number(req.params.taskId);
    const taskIndex = taskLists[index].tasks.findIndex(t => t.id === taskId);
    if (taskId === -1) return res.status(404).json({ success: false, error: "Task not found" });

    const {label} = req.body;
    taskLists[index].tasks[taskIndex].label = label;

    res.json({success:true, listId, label});
});

// Update list title
router.patch("/list/:listId/title", (req, res) => {
    const listId = Number(req.params.listId);
    const index = taskLists.findIndex(t => t.id === listId);
    if (index === -1) return res.status(404).json({ success: false, error: "TaskList not found" });

    const {title} = req.body;
    if (!title) return res.status(404).json({ success: false, error: "Cannot set empty title" });

    taskLists[index].title = title;

    res.json({success:true, listId, title});
});

export default router;