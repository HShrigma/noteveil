import { tempTasks } from "../model/tasks";
import { Request, Response } from "express";
import { sendEmptyError, sendNotFoundError, sendSuccess } from "../utils/messages";

export class TaskController {
    taskLists = tempTasks;

    public getTasks = (req: Request, res: Response) => {
        res.json(this.taskLists);
    };

    public deleteTaskList = (req: Request, res: Response) => {
        const listId = Number(req.params.id);

        this.taskLists = this.taskLists.filter(list => list.id !== listId);

        res.json(sendSuccess({ deletedId: listId }));
    };

    public deleteTask = (req: Request, res: Response) => {
        const listId = Number(req.params.id);
        const taskId = Number(req.params.taskId);

        const index = this.taskLists.findIndex(t => t.id === listId);
        if (index === -1) return sendNotFoundError(res, "TaskList");

        this.taskLists[index].tasks = this.taskLists[index].tasks.filter(t => t.id !== taskId);
        res.json(sendSuccess({ deletedId: listId, deletedTaskId: taskId }));
    }

    public addTaskList = (req: Request, res: Response) => {
        const listId = Number(req.params.id);
        const { title } = req.body;

        this.taskLists.push({ id: listId, title, tasks: [], nextId: undefined });

        res.json(sendSuccess({ listId: listId, title: title }));
    }

    public addTask = (req: Request, res: Response) => {
        const listId = Number(req.params.listId);
        const index = this.taskLists.findIndex(t => t.id === listId);

        if (index === -1) return sendNotFoundError(res, "TaskList");

        const taskId = Number(req.params.taskId);

        const { label } = req.body;
        if (!label) return sendEmptyError(res, "Label");

        this.taskLists[index].tasks.push({ id: taskId, label: label, done: false });

        res.json(sendSuccess({ listId: listId, taskId: taskId, label: label }));
    }

    public updateNextId = (req: Request, res: Response) => {
        const listId = Number(req.params.id);
        const index = this.taskLists.findIndex(t => t.id === listId);

        if (index === -1) return sendNotFoundError(res, "TaskList");

        const { nextId } = req.body;

        if (nextId !== undefined && !this.taskLists.some(list => list.id === nextId)) return sendNotFoundError(res, "nextId");

        this.taskLists[index].nextId = nextId;

        res.json(sendSuccess({ listId: listId, nextId: nextId }));
    }

    public updateTaskDone = (req: Request, res: Response) => {
        const listId = Number(req.params.listId);
        const index = this.taskLists.findIndex(t => t.id === listId);

        if (index === -1) return sendNotFoundError(res, "TaskList");

        const taskId = Number(req.params.taskId);
        const taskIndex = this.taskLists[index].tasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) return res.status(404).json({ success: false, error: "Task not found" });

        const { done } = req.body;
        this.taskLists[index].tasks[taskIndex].done = done;

        res.json(sendSuccess({ id: listId }));
    }

    public updateTaskLabel = (req: Request, res: Response) => {
        const listId = Number(req.params.listId);
        const index = this.taskLists.findIndex(t => t.id === listId);

        if (index === -1) return sendNotFoundError(res, "TaskList");

        const taskId = Number(req.params.taskId);
        const taskIndex = this.taskLists[index].tasks.findIndex(t => t.id === taskId);

        if (taskIndex === -1) return sendNotFoundError(res, "Task");

        const { label } = req.body;
        if (!label) return sendEmptyError(res, "Label");

        this.taskLists[index].tasks[taskIndex].label = label;

        res.json(sendSuccess({ id: listId, label: label }));
    }

    public updateListTitle = (req: Request, res: Response) => {
        const listId = Number(req.params.listId);
        const index = this.taskLists.findIndex(t => t.id === listId);

        if (index === -1) return sendNotFoundError(res, "TaskList");

        const { title } = req.body;
        if (!title) return sendEmptyError(res, "Title");

        this.taskLists[index].title = title;

        res.json(sendSuccess({ id: listId, title: title }));
    }

};

export default TaskController;