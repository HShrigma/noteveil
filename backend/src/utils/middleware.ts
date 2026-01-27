import { NextFunction, Request, Response } from "express";
import { sendEmptyError, sendError } from "../utils/messages";
import sanitizeHtml from 'sanitize-html';
import { decodeAccessToken, getTokenForHeaderOrCookie, getUserFromAuth, getUserFromTokens, JwtAccessPayload, verifyAccessToken, verifyRefreshToken } from "./security/jwtHelper";
import { clearAuthCookies } from "./controller/userControllerHelper";

export interface MiddlewareParams {
    idFields?: string[];
    bodyFields?: string[];
    auth?: boolean;
}

const isIdInvalid = (id: number) => { return isNaN(id) || id <= 0; }

const requireBodyFields = (fields: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        for (const field of fields) {
            if (!req.body[field]) {
                return sendEmptyError(res, field.charAt(0).toUpperCase() + field.slice(1)); // Capitalize for the message
            }
        }
        next();
    };
};

const validateIds = (fields: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        for (const field of fields) {
            if (!req.params[field]) {
                return sendEmptyError(res, field.charAt(0).toUpperCase() + field.slice(1)); // Capitalize for the message
            }
            const id = Number(req.params[field]);
            if (isIdInvalid(id)) return sendError(res, 400, "Invalid ID Parameter");
        }
        next();
    };
}
const sanitizeInput = () => {
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

export const requireAuth = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            getUserFromAuth(req, res);
            next();
        }
        catch (err: any) {
            clearAuthCookies(res);
            return sendError(res, 401, err.message);
        }
    };
}

export const runMiddleware = (params: MiddlewareParams) => {
    const middlewares: ((req: Request, res: Response, next: NextFunction) => void)[] = [];

    middlewares.push(sanitizeInput());
    // Validate body fields if required
    if (params.bodyFields && params.bodyFields.length > 0) middlewares.push(requireBodyFields(params.bodyFields));
    if (params.idFields && params.idFields.length > 0) middlewares.push(validateIds(params.idFields));
    if (params.auth) middlewares.push(requireAuth());

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