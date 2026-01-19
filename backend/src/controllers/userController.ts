import { Request, Response } from "express";
import { sendError, sendNotFoundError, sendSuccess } from "../utils/messages";
import UserService from "../services/userService";
import { AUTH_ROUTE, GOOGLE_ID } from "..";
import { OAuth2Client } from "google-auth-library";
import { GoogleUserInfo } from "../models/users";

const client = new OAuth2Client(GOOGLE_ID);

export class UserController {
    getGoogleUserInfo = async (access_token: string) => {
        if(!AUTH_ROUTE) return undefined;

        const res = await fetch(AUTH_ROUTE, {
            headers: { Authorization: `Bearer ${access_token}` }
        });
        const data:GoogleUserInfo = await res.json();
        return data;
    }

    public authenticateWithGoogle = async (req: Request, res: Response) => {
        const {token} = req.body;
        console.log(token);
        if (!token) return sendError(res, 400, "token not provided");
        if (!token.access_token) return sendError(res, 400, "Invalid token");
        if (!client) return sendError(res, 500, "Error getting client");

        const userInfo = await this.getGoogleUserInfo(token.access_token);
        if(!userInfo) return sendError(res, 500, "Error getting user info");

        const result = await UserService.authenticateWithGoogle(userInfo);
        if (result === null) return sendError(res, 500, "Error validating user");

        return res.json(sendSuccess(result));
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
        const {id, key, values} = req.body;
        
        const result = await UserService.updateUser(id, key, values);

        if (result === null) return sendError(res, 500, "Could not update User");
        if (!result.updated) return sendNotFoundError(res, "User");

        res.json(sendSuccess(result));
    }
};

export default new UserController;