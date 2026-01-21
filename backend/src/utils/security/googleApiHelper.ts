import { AUTH_ROUTE } from "../..";
import { GoogleUserInfo } from "../../models/users";

export const getGoogleUserInfo = async (access_token: string) => {
    if (!AUTH_ROUTE) return undefined;

    const res = await fetch(AUTH_ROUTE, {
        headers: { Authorization: `Bearer ${access_token}` }
    });
    const data: GoogleUserInfo = await res.json();
    return data;
}