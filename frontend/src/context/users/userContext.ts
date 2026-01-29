import { createContext, useContext } from "react";
import type { UserContextResult } from "../../types/userTypes";

export const UserContext = createContext<UserContextResult | null>(null);

export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) { throw new Error("useUserContext must be used within a UserProvider"); }
    return context;
}
