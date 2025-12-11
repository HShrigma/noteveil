
import { NextFunction, Request, Response } from "express";
import { sendEmptyError, sendError } from "../utils/messages";
import sanitizeHtml from 'sanitize-html';

const isIdInvalid = (id: number) => { return isNaN(id) || id <= 0; }

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

export const sanitizeInput = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.body) {
            Object.keys(req.body).forEach(key => {
                if (typeof req.body[key] === 'string') {
                    req.body[key] = sanitizeHtml(req.body[key], {
                        allowedTags: [],
                        allowedAttributes: {}
                    });
                }
            });
        }
        next();
    };
};

export const validateIdParam = (hasTaskId = false) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const id = Number(req.params.id);
        if (isIdInvalid(id)) return sendError(res, 400, "Invalid ID Parameter");

        if (hasTaskId) {
            const taskId = Number(req.params.taskId);
            if (isIdInvalid(taskId)) return sendError(res, 400, "Invalid Task ID Parameter");
        }
        next();
    };
};