import jwt from "jsonwebtoken";
import {  JWT_EXPIRES_IN_MS, JWT_SECRET } from "../..";

export type JwtPayload = {
    id: number;
    email: string;
}

export const signToken = (payload: JwtPayload) => {
    return jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN_MS});
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET as string) as JwtPayload;
}