import { NextFunction, Request, Response } from "express";
import { sendEmptyError, sendNotFoundError, sendSuccess } from "../utils/messages";

export const findById = <T extends { id: number }>(
    res: Response,
    id: number,
    errorName: string,
    arr: T[]
) => {
    const index = arr.findIndex(t => t.id === id);
    if (index === -1) { 
        sendNotFoundError(res, errorName); 
        return undefined;
    }
    return index;
}
