import { ReactNode } from "react";
import { UserContext, useUserContext } from "./userContext";
import { useUsers } from "../../hooks/users/useUsers";

export function UserProvider({ children, onLoginSuccess, onLogoutSuccess }: { children: ReactNode, onLoginSuccess: () => void, onLogoutSuccess: () => void }) {
    const ctx = useUsers(onLoginSuccess, onLogoutSuccess);
    return (
        <UserContext.Provider value={ctx} >
            {children}
        </UserContext.Provider>
    );
}