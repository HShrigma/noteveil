import { useState } from "react";
import UserTopIcon from "./UserTopIcon";
import { triggerScreenBob } from "../../../../utils/screenShake";
import UserOverlay from "./UserOverlay";
import { UserData } from "../../../../types/userTypes";

interface UserProps {
    user: UserData;
    onLogout: (withMessage?: boolean) => void;
    onUserDelete: (id: number) => void;
}
export const User = ({ user, onLogout, onUserDelete }: UserProps) => {
    const [isUserActive, setIsUserActive] = useState(false);
    return (
        <>
            <UserTopIcon userName={user.userName} OnIconClicked={() => { setIsUserActive(true); triggerScreenBob(200); }} isActive={isUserActive} />
            <UserOverlay
                user={user}
                isOpen={isUserActive}
                onClose={() => { setIsUserActive(false); triggerScreenBob(200); }}
                onLogout={onLogout}
                onUserDelete={onUserDelete}
            />
        </>
    );

}
export default User;