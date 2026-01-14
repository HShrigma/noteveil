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
            <UserTopIcon 
                userName={ctx.user.userName} 
                OnIconClicked={() => { setIsUserActive(true); triggerScreenBob(200); }} 
                isActive={isUserActive} />
            <UserOverlay
                user={ctx.user}
                isOpen={isUserActive}
                onClose={() => { setIsUserActive(false); triggerScreenBob(200); }}
                onLogout={onLogout}
                onUserDelete={ctx.deleteUser}
                onUserPasswordChange={ctx.updatePassword}
                onUsernameUpdate={ctx.updateUserName}
            />
        </>
    );

}
export default User;