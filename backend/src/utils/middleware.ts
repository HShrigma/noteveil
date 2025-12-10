
import { NextFunction, Request, Response } from "express";
import { sendEmptyError } from "../utils/messages";

export const requireBodyFields = (fields: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        for (const field of fields) {
            if (!req.body[field]) {
                return sendEmptyError(res, field.charAt(0).toUpperCase() + field.slice(1)); // Capitalize for the message
            }
        }
        next();
    };
};