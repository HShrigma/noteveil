import { useState } from "react";
import UserTopIcon from "./UserTopIcon";
import { triggerScreenBob } from "../../../../utils/screenShake";

export const User = ()=> {
    const [isUserActive, setIsUserActive] = useState(false);
    return (
        <UserTopIcon userName={"User"} OnIconClicked={() => {setIsUserActive(prev => !prev); triggerScreenBob(200);}} isActive={isUserActive} />
    );

}
export default User;