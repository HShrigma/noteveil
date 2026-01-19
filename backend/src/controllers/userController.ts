import { Request, Response } from "express";
import { sendError, sendNotFoundError, sendSuccess } from "../utils/messages";
import UserService from "../services/userService";

export class UserController {
    public authenticateWithGoogle = (req:Request, res:Response) => {
        return sendError(res,500, "Authentication unimplemented");
    }

    public fetchUser = async (req:Request, res:Response) => {
        const {email, password} = req.body;
        let result, err, code;

        if (!password) {
            result = { exists: UserService.getHasEmail(email) };
            err = "Could not fetch email verification";
            code = 500;
        }
        else {
            result = await UserService.getUser(email, password); 
            err = "Could not fetch Users";
            code = 404;
        }
        if (result === null) return sendError(res, code, err);

        res.json(result);
    }

    public deleteUser = async (req:Request, res:Response) => {
        const {id, password} = req.body; 
        const result = await UserService.deleteUser(id, password);

        console.log("RES: " + result);
        if (result === null) return sendError(res, 500, "Could not delete User");
        if (!result.deleted) return sendNotFoundError(res, "User");

        res.json(sendSuccess(result));
    }

    public addUser = async (req:Request, res:Response) => {
        const {email, name, password} = req.body;
        const result = await UserService.addUser(email, name, password);
        if (result === null) return sendError(res, 500, "Could not add User");

        res.json(sendSuccess(result));
    }

    public updateUser = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const {key, values} = req.body;
        
        const result = await UserService.updateUser(id, key, values);

        if (result === null) return sendError(res, 500, "Could not update User");
        if (!result.updated) return sendNotFoundError(res, "User");

        res.json(sendSuccess(result));
    }
};

export default new UserController;