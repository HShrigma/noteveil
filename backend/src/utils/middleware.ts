
import { NextFunction, Request, Response } from "express";
import { sendEmptyError, sendError } from "../utils/messages";
import sanitizeHtml from 'sanitize-html';

export interface MiddlewareParams {
    validateId?: boolean;
    hasTaskId?: boolean;
    bodyFields?: string[];
}

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


export const runMiddleware = (params: MiddlewareParams) => {
    const middlewares: ((req: Request, res: Response, next: NextFunction) => void)[] = [];

    middlewares.push(sanitizeInput());

    // Validate body fields if required
    if (params.bodyFields && params.bodyFields.length > 0) {
        middlewares.push(requireBodyFields(params.bodyFields));
    }

    // Validate ID parameters
    if (params.validateId !== undefined) {
        const hasTaskId = params.hasTaskId === undefined ? false : params.hasTaskId;
        middlewares.push(validateIdParam(params.hasTaskId));
    }

    // Return a single middleware that runs all selected middlewares in sequence
    return (req: Request, res: Response, next: NextFunction) => {
        let index = 0;

        const runNext = (err?: any) => {
            if (err) return next(err);
            const middleware = middlewares[index++];
            if (middleware) {
                middleware(req, res, runNext);
            } else {
                next();
            }
        };

        runNext();
    };
};