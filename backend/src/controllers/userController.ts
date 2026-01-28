import { Request, Response } from "express";
import { sendError, sendNotFoundError, sendSuccess } from "../utils/messages";
import UserService from "../services/userService";
import { GOOGLE_ID } from "..";
import { OAuth2Client } from "google-auth-library";
import { getGoogleUserInfo } from "../utils/security/googleApiHelper";
import { getTokenForHeaderOrCookie } from "../utils/security/jwtHelper";
import { clearAuthCookies, clearCookiesAndSendSuccess, decodeHTTPError, fetchHasEmail, getFetchCredentialsError, setAuthCookieFromToken, signAndSetAuthCookies, signCookieAndSendData, signCookieAndSendSuccess, throwHTTPError } from "../utils/controller/userControllerHelper";
import { getUserToUserReturnObj } from "../utils/repo/userRepoHelpers";
import userService from "../services/userService";

const client = new OAuth2Client(GOOGLE_ID);

export class UserController {
    public refreshUser = async (req: Request, res: Response) => {
        try {
            const userId = (req as Request & { userId: number }).userId;
            const result = await UserService.getUserById(userId);
            if (result === null) throw new Error("Invalid User ID");
            return res.json(result);
        } catch (err: any) {
            console.error("Refresh failed:", err);
            clearAuthCookies(res);
            return sendError(res, 401, err.message);
        }
    };

    public authenticateWithGoogle = async (req: Request, res: Response) => {
        try{
            const { token: googleToken } = req.body;

            if (!googleToken) throwHTTPError(400, "Google token not provided");
            if (!googleToken.access_token) throwHTTPError(400, "Invalid token");
            if (!client) throwHTTPError(500, "Error getting client");

            const userInfo = await getGoogleUserInfo(googleToken.access_token);
            if (!userInfo) throwHTTPError(500, "Error getting user info");

            const result = await UserService.authenticateWithGoogle(userInfo!);

            signCookieAndSendSuccess(res, result);
        }
        catch (err: any) { return decodeHTTPError(err, res); }
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
        const userId = (req as Request & { userId: number }).userId;
        const result = !req.body ? await UserService.deleteUserById(userId) : await UserService.deleteUser(userId, req.body["password"]);
        if (result === null) return sendError(res, 500, "Could not delete User");
        if (!result.deleted) return sendNotFoundError(res, "User");

        clearCookiesAndSendSuccess(res, result);
    }

    public logout = async (req: Request, res: Response) => clearCookiesAndSendSuccess(res, {});

    public register = async (req: Request, res: Response) => {
        const { email, name, password } = req.body;
        const result = await UserService.addUser(email, name, password);
        if (result === null) return sendError(res, 500, "Could not add User");

        signCookieAndSendSuccess(res, result);
    }

    public updateUser = async (req: Request, res: Response) => {
        const userId = (req as Request & { userId: number }).userId;
        const { key, values } = req.body;

        const result = await UserService.updateUser(userId, key, values);
        if (result === null) return sendError(res, 500, "Could not update User");
        if (!result.updated) return sendNotFoundError(res, "User");

        signCookieAndSendSuccess(res, result);
    }
};

export default new UserController;