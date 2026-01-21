import jwt from "jsonwebtoken";
import {  JWT_EXPIRES_IN_S, JWT_SECRET } from "../..";
import { CookieOptions, Request } from "express";

export type JwtPayload = {
    id: number;
}

export const signToken = (payload: JwtPayload) => {
    return jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN_S});
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET as string) as JwtPayload;
}

export const getTokenForHeaderOrCookie = (req: Request) => {
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith("Bearer ")) {
        const token = authHeader.slice(7).trim();
        if (token.length > 0) return token;
    }

    return req.cookies?.token;
}
export const cookieSettings = {
    httpOnly: true,
    secure: false, // true in prod (HTTPS)
    sameSite: "lax",
} as CookieOptions;