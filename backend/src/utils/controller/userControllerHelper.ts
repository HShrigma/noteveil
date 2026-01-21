import  UserService  from "../../services/userService";
import { Response } from "express";
import { sendError } from "../messages";

export const fetchHasEmail = (email: string | undefined, res: Response) => {
    if (!email) return sendError(res, 404, "Email not found");

    const result = { exists: UserService.getHasEmail(email) };
    if (result === null) return sendError(res, 500, "Could not fetch email verification");

    return res.json(result);
}
export const getFetchCredentialsError = (email: string | undefined, password: string | undefined) => {
    if (!email) return "Email not found";
    if (!password) return "Password not found";
    return undefined;
}