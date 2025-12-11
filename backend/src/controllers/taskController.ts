import { Request, Response } from "express";
import { sendNotFoundError, sendSuccess } from "../utils/messages";
import TaskService from "../services/taskService"; 

export class TaskController {
    public getTasks = (_req: Request, res: Response) => {
        res.json(TaskService.getAllTasks());
    };

    public deleteTaskList = (req: Request, res: Response) => {
        const listId = Number(req.params.id);
        const result = TaskService.deleteTaskList(listId);
        res.json(sendSuccess(result));
    };

    public deleteTask = (req: Request, res: Response) => {
        const listId = Number(req.params.id);
        const taskId = Number(req.params.taskId);
        const result = TaskService.deleteTask(listId, taskId);

        if (result === null || result.error) {
            return sendNotFoundError(res, result?.error === "Task not found" ? "Task" : "TaskList");
        }
        res.json(sendSuccess(result));
    }

    public addTaskList = (req: Request, res: Response) => {
        const listId = Number(req.params.id);
        const { title } = req.body;
        const result = TaskService.addTaskList(listId, title);

        res.json(sendSuccess(result));
    }

    public addTask = (req: Request, res: Response) => {
        const listId = Number(req.params.id);
        const taskId = Number(req.params.taskId);
        const { label } = req.body;
        
        const result = TaskService.addTask(listId, taskId, label);

        if (result === null) {
            return sendNotFoundError(res, "TaskList");
        }

        res.json(sendSuccess(result));
    }

    public updateNextId = (req: Request, res: Response) => {
        const listId = Number(req.params.id);
        const { nextId } = req.body;
        
        const result = TaskService.updateNextId(listId, nextId);

        if (result.error) {
            // Handles both "TaskList not found" and "nextId not found"
            return sendNotFoundError(res, result.error.includes("TaskList") ? "TaskList" : "nextId");
        }

        res.json(sendSuccess(result));
    }

    public updateTaskDone = (req: Request, res: Response) => {
        const listId = Number(req.params.id);
        const taskId = Number(req.params.taskId);
        const { done } = req.body;

        const result = TaskService.updateTaskDone(listId, taskId, done);
        
        if (result.error) {
            return sendNotFoundError(res, result.error.includes("TaskList") ? "TaskList" : "Task");
        }

        res.json(sendSuccess(result));
    }

    public updateTaskLabel = (req: Request, res: Response) => {
        const listId = Number(req.params.id);
        const taskId = Number(req.params.taskId);
        const { label } = req.body;

        const result = TaskService.updateTaskLabel(listId, taskId, label);
        
        if (result.error) {
            return sendNotFoundError(res, result.error.includes("TaskList") ? "TaskList" : "Task");
        }

        res.json(sendSuccess(result));
    }

    public updateListTitle = (req: Request, res: Response) => {
        const listId = Number(req.params.id);
        const { title } = req.body;
        
        const result = TaskService.updateListTitle(listId, title);

        if (result === null) {
            return sendNotFoundError(res, "TaskList");
        }
        
        res.json(sendSuccess(result));
    }
};

export default TaskController;