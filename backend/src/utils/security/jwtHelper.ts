import jwt from "jsonwebtoken";
import { JWT_ACCESS_EXPIRES_IN_S, JWT_REFRESH_EXPIRES_IN_S, JWT_SECRET } from "../..";
import { CookieOptions, Request, Response } from "express";

export type GetUserResult = {
    userId: number;
    newAccessToken?: string;
    newRefreshToken?: string;
};
export type JwtAccessPayload = {
    id: number;
}
export type JwtRefreshPaload = {
    expired: boolean;
    sessionId?: string;
}

export const cookieSettings = {
    httpOnly: true,
    secure: true, // true in prod (HTTPS)
    sameSite: "lax",
} as CookieOptions;

const isNearExpiry = (token: string, thresholdSeconds: number = 60) => {
    const decoded = jwt.decode(token, { complete: true }) as
        | { payload: { exp: number } }
        | null;
    if (!decoded || !decoded.payload.exp) return false;

    const now = Math.floor(Date.now() / 1000);
    return decoded.payload.exp - now < thresholdSeconds;
};

export const signRefreshToken = (payload: JwtRefreshPaload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN_S });
}

export const signAccessToken = (payload: JwtAccessPayload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_ACCESS_EXPIRES_IN_S });
}

export const verifyRefreshToken = (refreshToken: string) => {
    try { return jwt.verify(refreshToken, JWT_SECRET as string) as JwtRefreshPaload; }
    catch (error: any) {
        if (error.name === "TokenExpiredError") return "expired";
        else {
            console.error(`Unhandled error: ${error.name}`, error);
            return "unhandled";
        }
    }
}

export const verifyAccessToken = (token: string) => {
    try {
        const res = jwt.verify(token, JWT_SECRET as string) as JwtAccessPayload;
        return res;
    }
    catch (error: any) {
        if (error.name === "TokenExpiredError") return "expired";
        else {
            console.error(`Unhandled error: ${error.name}`, error);
            return "unhandled";
        }
    }
}

export const getTokenForHeaderOrCookie = (req: Request, type: "access" | "refresh" = "access") => {
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith("Bearer ")) {
        const token = authHeader.slice(7).trim();
        if (token.length > 0) return token;
    }

    return req.cookies?.[type + "Token"];
}

export const decodeAccessToken = (token: string) => {
    return jwt.decode(token) as JwtAccessPayload | null;
}

export const getUserFromTokens = (
    accessToken: string | undefined,
    refreshToken?: string
): GetUserResult => {
    if (!accessToken) throw new Error("Missing access token");

    let accessPayload = verifyAccessToken(accessToken);
    if (accessPayload === "unhandled") throw new Error("Malformed access token");

    let newRefreshToken: string | undefined;
    let newAccessToken: string | undefined;

    if (accessPayload === "expired") {
        if (!refreshToken) throw new Error("Missing refresh token");

        const refreshPayload = verifyRefreshToken(refreshToken);

        if (refreshPayload === "unhandled") throw new Error("Malformed refresh token");
        if (refreshPayload === "expired") throw new Error("Expired refresh token");
        if ((refreshPayload as JwtRefreshPaload).expired) throw new Error("Expired refresh token");


        const decoded = decodeAccessToken(accessToken);
        if (!decoded) throw new Error("Malformed access token");

        newAccessToken = signAccessToken({ id: decoded.id });
        if (isNearExpiry(refreshToken, 60 * 5)) newRefreshToken = signRefreshToken({ expired: false });

        return { userId: decoded.id, newAccessToken, newRefreshToken };
    }

    if (typeof accessPayload === "string") throw new Error("Unexpected access payload state");
    if (isNearExpiry(accessToken, 60)) newAccessToken = signAccessToken({id: accessPayload.id});
    return { userId: (accessPayload as JwtAccessPayload).id, newAccessToken };

};

export const getUserFromAuth = (req: Request, res: Response) => {
    try {
        const accessToken = getTokenForHeaderOrCookie(req, "access");
        const refreshToken = getTokenForHeaderOrCookie(req, "refresh");

        const { userId, newAccessToken, newRefreshToken } = getUserFromTokens(accessToken, refreshToken);

        (req as any).userId = userId;

        if (newAccessToken) res.cookie("accessToken", newAccessToken, cookieSettings);
        if (newRefreshToken) res.cookie("refreshToken", newRefreshToken, cookieSettings);
    }
    catch (error: any) {console.log("error occurred", error); throw error; }
}