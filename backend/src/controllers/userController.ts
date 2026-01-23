import { Request, Response } from "express";
import { sendError, sendNotFoundError, sendSuccess } from "../utils/messages";
import UserService from "../services/userService";
import { GOOGLE_ID } from "..";
import { OAuth2Client } from "google-auth-library";
import { getGoogleUserInfo } from "../utils/security/googleApiHelper";
import { getTokenForHeaderOrCookie } from "../utils/security/jwtHelper";
import { clearCookieAndSendSuccess, fetchHasEmail, getFetchCredentialsError, setAuthCookieFromToken, signAndSetAuthCookie, signCookieAndSendData, signCookieAndSendSuccess } from "../utils/controller/userControllerHelper";
import { getUserToUserReturnObj } from "../utils/repo/userRepoHelpers";

const client = new OAuth2Client(GOOGLE_ID);

export class UserController {
    public refreshUser = async (req: Request, res: Response) => {
        try {
            const token = getTokenForHeaderOrCookie(req);
            if (!token) return sendError(res, 401, "User Token not found");

            const result = await UserService.getUserJWTRefreshResult(token);
            if (result === null) return sendError(res, 401, "User no longer exists");

            setAuthCookieFromToken(res, result.token);
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

        signCookieAndSendSuccess(res, result);
    }

    public fetchUser = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        if (!password) return fetchHasEmail(email, res);

        const err = getFetchCredentialsError(email, password);
        if (err) return sendError(res, 404, err);

        const result = await UserService.getUser(email, password);
        if (result === null) return sendError(res, 404, "User not found");

        signCookieAndSendData(res, result, getUserToUserReturnObj(result, false));
    }

    public deleteUser = async (req: Request, res: Response) => {
        const { id, password } = req.body;
        const result = await UserService.deleteUser(id, password);

        if (result === null) return sendError(res, 500, "Could not delete User");
        if (!result.deleted) return sendNotFoundError(res, "User");

        clearCookieAndSendSuccess(res, result);
    }

    public logout = async (req: Request, res: Response) => clearCookieAndSendSuccess(res, {});

    public register = async (req: Request, res: Response) => {
        const { email, name, password } = req.body;
        const result = await UserService.addUser(email, name, password);
        if (result === null) return sendError(res, 500, "Could not add User");

        signCookieAndSendSuccess(res, result);
    }

    public updateUser = async (req: Request, res: Response) => {
        const { id, key, values } = req.body;

        const result = await UserService.updateUser(id, key, values);

        if (result === null) return sendError(res, 500, "Could not update User");
        if (!result.updated) return sendNotFoundError(res, "User");

        signCookieAndSendSuccess(res, result);
    }
};

export default new UserController;