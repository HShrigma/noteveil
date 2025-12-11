import { Request, Response } from "express";

const getNotFoundMsg = (item: string) => {return `${item} not found`;}
const getEmptyBodyItemMsg = (item: string) => {return `${item} cannot be empty`;}

export const sendError = (res: Response, code:number, msg: string) => {
    return res.status(code).json({ success: false, error: msg });
}

export const sendNotFoundError = ( res: Response, item: string) => {
    return sendError(res, 404, getNotFoundMsg(item));
}

export const sendEmptyError = ( res: Response, item: string) => {
    return sendError(res, 400, getEmptyBodyItemMsg(item));
}

export const sendSuccess = (body: Object) => {
    return ({success:true, body});
}
