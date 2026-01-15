import { Request, Response } from "express";
import { sendError, sendNotFoundError, sendSuccess } from "../utils/messages";
import UserService from "../services/userService";

export class UserController {
    public fetchUser = (req:Request, res:Response) => {
        const {email, password} = req.body;
        let result, err;

        if (!password) {
            result = { exists: UserService.getHasEmail(email) };
            err = "Could not fetch email verification";
        }
        else {
            result = UserService.getUser(email, password); 
            err = "Could not fetch Users";
        }
        if (result === null) return sendError(res, 500, err);

        res.json(result);
    }

    public deleteUser = (req:Request, res:Response) => {
        const id = Number(req.params.id);
        const result = UserService.deleteUser(id);

        if (result === null) return sendError(res, 500, "Could not delete User");
        if (!result.deleted) return sendNotFoundError(res, "User");

        res.json(sendSuccess(result));
    }

    public addUser = (req:Request, res:Response) => {
        const {email, name, password} = req.body;
        const result = UserService.addUser(email, name, password);
        if (result === null) return sendError(res, 500, "Could not add User");

        res.json(sendSuccess(result));
    }

    public updateUser = (req:Request, res:Response) => {
        const id = Number(req.params.id);
        const {key,value} = req.body;
        
        const result = UserService.updateUser(id, key, value);

        if (result === null) return sendError(res, 500, "Could not update User");
        if (!result.updated) return sendNotFoundError(res, "User");

        res.json(sendSuccess(result));
    }
};

export default new UserController;