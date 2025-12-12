import { Request, Response } from "express";
import { sendError, sendNotFoundError, sendSuccess } from "../utils/messages";
import TaskService from "../services/taskService";

export class TaskController {
    public getTasks = (_req: Request, res: Response) => {
        const result = TaskService.getAllTasks();

        

        res.json(result);
    };

    public deleteTaskList = (req: Request, res: Response) => {
        const listId = Number(req.params.id);
        const result = TaskService.deleteTaskList(listId);

        if (result === null) return sendError(res, 500, "Could not delete TaskList");
        if (!result.deleted) return sendNotFoundError(res, "TaskList");

        res.json(sendSuccess(result));
    };

    public deleteTask = (req: Request, res: Response) => {
        const taskId = Number(req.params.taskId);
        const result = TaskService.deleteTask(taskId);

        if (result === null) return sendError(res, 500, "Could not delete Task");
        if (!result.deleted) return sendNotFoundError(res, "Task")

        res.json(sendSuccess(result));
    }

    public addTaskList = (req: Request, res: Response) => {
        const { title } = req.body;
        const result = TaskService.addTaskList(title);

        if (result === null) return sendError(res, 500, "Could not add TaskList");

        res.json(sendSuccess(result));
    }

    public addTask = (req: Request, res: Response) => {
        const listId = Number(req.params.id);
        const { label } = req.body;

        const result = TaskService.addTask(listId, label);

        if (result === null) return sendError(res, 500, "Could not add Task");

        res.json(sendSuccess(result));
    }

    public updateNextId = (req: Request, res: Response) => {
        const listId = Number(req.params.id);
        const { nextId } = req.body;

        const result = TaskService.updateNextId(listId, nextId);

        if (result === null) return sendError(res, 500, "Could not update TaskList next Id");
        if (!result.updated) return sendNotFoundError(res, "TaskList");

        res.json(sendSuccess(result));
    }

    public updateTaskDone = (req: Request, res: Response) => {
        const taskId = Number(req.params.taskId);
        const { done } = req.body;

        const result = TaskService.updateTaskDone(taskId, done);

        if (result === null) return sendError(res, 500, "Could not update Task done");
        if (!result.updated) return sendNotFoundError(res, "Task");

        res.json(sendSuccess(result));
    }

    public updateTaskLabel = (req: Request, res: Response) => {
        const taskId = Number(req.params.taskId);
        const { label } = req.body;

        const result = TaskService.updateTaskLabel(taskId, label);

        if (result === null) return sendError(res, 500, "Could not update Task label");
        if (!result.updated) return sendNotFoundError(res, "Task");

        res.json(sendSuccess(result));
    }

    public updateListTitle = (req: Request, res: Response) => {
        const listId = Number(req.params.id);
        const { title } = req.body;

        const result = TaskService.updateListTitle(listId, title);

        if (result === null) return sendError(res, 500, "Could not update TaskList title");
        if (!result.updated) return sendNotFoundError(res, "TaskList");

        res.json(sendSuccess(result));
    }
};

export default TaskController;