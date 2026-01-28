import { useState } from "react";
import UserTopIcon from "./UserTopIcon";
import { triggerScreenBob } from "../../../../utils/screenShake";
import UserOverlay from "./UserOverlay";
import { useUserContext } from "../../../../context/users/userContext";

interface UserProps {
    onLogout: (withMessage?: boolean) => void;
}
export const User = ({ onLogout}: UserProps ) => {
    const [isUserActive, setIsUserActive] = useState(false);

    const ctx = useUserContext();

    return (
        ctx.user !== null && 
        <>
            {!isUserActive && <UserTopIcon 
                OnIconClicked={() => { setIsUserActive(true); triggerScreenBob(200); }} 
                isActive={isUserActive} 
            />}
            <UserOverlay
                isOpen={isUserActive}
                onClose={() => { setIsUserActive(false); triggerScreenBob(200); }}
                onLogout={onLogout}
            />
        </>
    );

}
export default User;