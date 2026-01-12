import { useState } from "react";
import UserTopIcon from "./UserTopIcon";
import { triggerScreenBob } from "../../../../utils/screenShake";
import UserOverlay from "./UserOverlay";

interface UserProps {
    onLogout: () => void;
}
export const User = ({onLogout}:UserProps) => {
    const [isUserActive, setIsUserActive] = useState(false);
    return (
        <>
            <UserTopIcon userName={"User"} OnIconClicked={() => { setIsUserActive(true); triggerScreenBob(200); }} isActive={isUserActive} />
            <UserOverlay
                isOpen={isUserActive}
                onClose={() => { setIsUserActive(false); triggerScreenBob(200); }}
                onLogout={onLogout}
            />
        </>
    );

}
export default User;