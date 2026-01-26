import { signAccessToken, cookieSettings, signRefreshToken } from "../security/jwtHelper";
import UserService from "../../services/userService";
import { Request, Response } from "express";
import { sendError, sendSuccess } from "../messages";

export const throwHTTPError = (code: number, msg: string):never => { throw new Error(`${code}$${msg}`); }
export const decodeHTTPError = (err: Error, res: Response) => {
    const msgArr = err.message.split("$");
            if (msgArr.length < 2) { 
                console.error("unexpected error:", err.message);
                return sendError(res, 500, "Unhandled exception");
            }
            const code = Number(msgArr[0]);
            const msg = msgArr[1];
            return sendError(res, code, msg);
}

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

export const signAndSetAuthCookies = (res: Response, userId: number) => {
    const accessToken = signAccessToken({ id: userId });
    const refreshToken = signRefreshToken({expired: false});

    res.cookie("accessToken", accessToken, cookieSettings);
    res.cookie("refreshToken", refreshToken, cookieSettings);

    return accessToken;
}

export const clearAuthCookies = (res: Response) => {
    res.clearCookie("refreshToken", cookieSettings);
    res.clearCookie("accessToken", cookieSettings);
}

export const setAuthCookieFromToken = (res: Response, token: string) => {
    res.cookie("accessToken", token, cookieSettings);
};

export const signCookieAndSendSuccess = <T extends { id: number }>(res: Response, result: T) => {
    signAndSetAuthCookies(res, result.id);
    res.json(sendSuccess(result))
}
export const clearCookiesAndSendSuccess = (res: Response, result: Object) => {
    clearAuthCookies(res);
    res.json(sendSuccess(result))
}

export const signCookieAndSendData = <T extends { id: number }, R>(
    res: Response,
    result: T,
    response: R
) => {
    signAndSetAuthCookies(res, result.id);
    res.json(response);
};
