import { signToken, cookieSettings } from "../security/jwtHelper";
import UserService from "../../services/userService";
import { Request, Response } from "express";
import { sendError, sendSuccess } from "../messages";

export const fetchHasEmail = (email: string | undefined, res: Response) => {
    if (!email) return sendError(res, 404, "Email not found");

    const result = { exists: UserService.getHasEmail(email) };
    if (result === null) return sendError(res, 500, "Could not fetch email verification");

    return res.json(result);
}
export const getFetchCredentialsError = (email: string | undefined, password: string | undefined) => {
    if (!email) return "Email not found";
    if (!password) return "Password not found";
    return undefined;
}

export const signAndSetAuthCookie = (res: Response, userId: number) => {
    const token = signToken({ id: userId });
    res.cookie("token", token, cookieSettings);
    return token;
}

export const clearAuthCookie = (res: Response) => {
    res.clearCookie("token", cookieSettings);
}

export const setAuthCookieFromToken = (res: Response, token: string) => {
    res.cookie("token", token, cookieSettings);
};

export const signCookieAndSendSuccess = <T extends { id: number }>(res: Response, result: T) => {
    signAndSetAuthCookie(res, result.id);
    res.json(sendSuccess(result))
}
export const clearCookieAndSendSuccess = (res: Response, result: Object) => {
    clearAuthCookie(res);
    res.json(sendSuccess(result))
}

export const signCookieAndSendData = <T extends { id: number }, R>(
    res: Response,
    result: T,
    response: R
) => {
    signAndSetAuthCookie(res, result.id);
    res.json(response);
};
