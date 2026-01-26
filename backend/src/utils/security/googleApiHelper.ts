import { AUTH_ROUTE } from "../..";
import { GoogleUserInfo } from "../../models/users";

export const getGoogleUserInfo = async (access_token: string) => {
    if (!AUTH_ROUTE) return undefined;

    try {
        const res = await fetch(AUTH_ROUTE, {
            headers: { Authorization: `Bearer ${access_token}` }
        });
        if (!res.ok) {
            console.error("Google user info fetch failed:", res.status, await res.text());
            return undefined;
        }
        const data: GoogleUserInfo = await res.json();
        return data;
    } catch (err) {
        console.error("Error fetching Google user info:", err);
        return undefined;
    }
}