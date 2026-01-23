import { Request, Response } from "express";
import { sendError, sendNotFoundError, sendSuccess } from "../utils/messages";
import ProjectService from "../services/projectService";

export class ProjectController {

    public getProjects = (req:Request, res:Response) => {
        const userId = (req as Request & { userId: number }).userId;
        if(!userId) return sendError(res, 401, "Unauthorized");

        const result = ProjectService.getProjectsForUser(userId);

        if (result === null) return sendError(res, 500, "Could not fetch Projects");
        res.json(result);
    }

    public deleteProject = (req:Request, res:Response) => {
        const id = Number(req.params.id);
        const result = ProjectService.deleteProject(id);

        if (result === null) return sendError(res, 500, "Could not delete Project");
        if (!result.deleted) return sendNotFoundError(res, "Project");

        res.json(sendSuccess(result));
    }

    public addProject = (req:Request, res:Response) => {
        const userId = (req as Request & { userId: number }).userId;
        if(!userId) return sendError(res, 401, "Unauthorized");

        const {title} = req.body;

        const result = ProjectService.addProject(userId, title);
        if (result === null) return sendError(res, 500, "Could not add Project");
        res.json(sendSuccess(result));
    }

    public updateProjectTitle = (req:Request, res:Response) => {
        const id = Number(req.params.id);
        const {title} = req.body;
        
        const result = ProjectService.updateProjectTitle(id,title);

        if (result === null) return sendError(res, 500, "Could not update Project title");
        if (!result.updated) return sendNotFoundError(res, "Project");

        res.json(sendSuccess(result));
    }
};

export default new ProjectController;