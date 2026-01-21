import { Request, Response } from "express";
import { sendError, sendNotFoundError, sendSuccess } from "../utils/messages";
import UserService from "../services/userService";
import { GOOGLE_ID } from "..";
import { OAuth2Client } from "google-auth-library";
import { getGoogleUserInfo } from "../utils/security/googleApiHelper";
import { cookieSettings, getTokenForHeaderOrCookie, JwtPayload, signToken, verifyToken } from "../utils/security/jwtHelper";

const client = new OAuth2Client(GOOGLE_ID);

export class UserController {

    public refreshUser = async (req: Request, res: Response) => {
        try {
            const token = getTokenForHeaderOrCookie(req);
            if (!token) return sendError(res, 401, "User Token not found");

            const result = await UserService.getUserJWTRefreshResult(token);
            if(result === null ) return sendError(res, 401, "User no longer exists");

            res.cookie("token", result.token, cookieSettings);
            return res.json(result.user);
        } catch (err) {
            console.error("Refresh failed:", err);
            return sendError(res, 401, "Invalid or expired token");
        }
    };

    public authenticateWithGoogle = async (req: Request, res: Response) => {
        const { token } = req.body;

        if (!token) return sendError(res, 400, "token not provided");
        if (!token.access_token) return sendError(res, 400, "Invalid token");
        if (!client) return sendError(res, 500, "Error getting client");

        const userInfo = await getGoogleUserInfo(token.access_token);
        if (!userInfo) return sendError(res, 500, "Error getting user info");

        const result = await UserService.authenticateWithGoogle(userInfo);
        if (result === null) return sendError(res, 500, "Error validating user");

        return res.json(sendSuccess(result));
    }

    public fetchUser = async (req: Request, res: Response) => {
        const { email, password } = req.body;
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

    public deleteUser = async (req: Request, res: Response) => {
        const { id, password } = req.body;
        const result = await UserService.deleteUser(id, password);

        console.log("RES: " + result);
        if (result === null) return sendError(res, 500, "Could not delete User");
        if (!result.deleted) return sendNotFoundError(res, "User");

        res.json(sendSuccess(result));
    }

    public register = async (req: Request, res: Response) => {
        const { email, name, password } = req.body;
        const result = await UserService.addUser(email, name, password);
        if (result === null) return sendError(res, 500, "Could not add User");

        const newToken = signToken(result);
        res.cookie("token", newToken, cookieSettings);

        res.json(sendSuccess(result));
    }

    public updateUser = async (req: Request, res: Response) => {
        const { id, key, values } = req.body;

        const result = await UserService.updateUser(id, key, values);

        if (result === null) return sendError(res, 500, "Could not update User");
        if (!result.updated) return sendNotFoundError(res, "User");

        res.json(sendSuccess(result));
    }
};

export default new UserController;