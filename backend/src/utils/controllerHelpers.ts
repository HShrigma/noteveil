import { Request, Response } from "express";
import { sendEmptyError, sendNotFoundError } from "./messages";

const sendErrorIndexAndItem = (error: Response) => {
    return {index: undefined, item: undefined, error:error};
}

export const validateResourceAndProperty = <T extends {id: number} >(
    req: Request,
    res: Response, 
    idParam: number | string, 
    collection: T[],
    itemName: string,
    bodyItemName: string
) => {
    const id = typeof idParam === "string" ? Number(idParam) : idParam;
    const index = collection.findIndex((el) => el.id === id);

    if (index === -1) return sendErrorIndexAndItem(sendNotFoundError(res, itemName));

    const item = req.body[bodyItemName];
    if (!item) return sendErrorIndexAndItem(sendEmptyError(res, bodyItemName));

    return { index: index, item: item, error: undefined};
}