import { Request, Response } from "express";
import { sendError, sendNotFoundError, sendSuccess } from "../utils/messages";
// import UserService from "../services/userService";

export class UserController {

    sampleUsers = [
    { id: 1, title: "Sample", taskCount: 20, noteCount: 10 },
    { id: 2, title: "Sample 2", taskCount: 20, noteCount: 10 },
    ];
    public getUser = (req:Request, res:Response) => {
        const id = Number(req.params.id);
        const result = null;
        // const result = UserService.getUser();
        if (result === null) return sendError(res, 500, "Could not fetch Users");
        res.json(result);
    }

    public deleteUser = (req:Request, res:Response) => {
        const id = Number(req.params.id);
        const result = null;
        // const result = UserService.deleteUser(id);

        if (result === null) return sendError(res, 500, "Could not delete User");
        // if (!result.deleted) return sendNotFoundError(res, "User");

        res.json(sendSuccess(result));
    }

    public addUser = (req:Request, res:Response) => {
        const {title} = req.body;
        const result = null;
        // const result = UserService.addUser(title);
        if (result === null) return sendError(res, 500, "Could not add User");
        res.json(sendSuccess(result));
    }

    public updateUser = (req:Request, res:Response) => {
        const id = Number(req.params.id);
        const {title} = req.body;
        
        const result = null;
        // const result = UserService.updateUserTitle(id,title);

        if (result === null) return sendError(res, 500, "Could not update User");
        // if (!result.updated) return sendNotFoundError(res, "User");

        res.json(sendSuccess(result));
    }
};

export default new UserController;