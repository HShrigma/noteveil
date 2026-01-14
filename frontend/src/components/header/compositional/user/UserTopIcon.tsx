import { useEffect, useState } from "react";
import EditableTitle from "../../../shared/title/EditableTitle";
import { discardMsgUsername } from "../../../../utils/registries";
import ErrorHint from "../../../shared/ErrorHint";

interface UserTopIconProps {
    isActive: boolean;
    userName?: string;
    OnIconClicked: () => void;
    onUsernameUpdate?: (newName:string)=> void;
}

const UserTopIcon = ({ userName = "User", OnIconClicked, onUsernameUpdate, isActive, }: UserTopIconProps) => {
    const [isEditing,setIsEditing] = useState(false);
    const [userField,setUserField] = useState(userName);
    useEffect(()=>{
        setUserField(userName);
    },[isActive,isEditing])

    const onActivityRequest = (wantsActive:boolean, value:string) => {
        if (wantsActive && !isEditing) {
            setIsEditing(true); 
            return;
        }
        if (!wantsActive && isEditing) {
            setIsEditing(false);
            setUserField(userName);
            return;
        }
    }
    const handleSubmit = (newValue:string) => {
        onUsernameUpdate?.(newValue);
        setIsEditing(false);
    }
    const initials = userName
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase();

    return (
        isActive ?
            <div
                className={`fade-in flex items-center gap-2 duration-150`} 
            >
                <div
                    className="w-11 h-11 rounded-full bg-[#7aa2f7] flex items-center justify-center text-[#1a1b26] font-bold  select-none"
                    title={userName}
                >
                    {initials || "U"}
                </div>
                <EditableTitle 
                    title={userField}
                    isActive={isEditing} 
                    discardMsg={discardMsgUsername}
                    onActivityRequest={onActivityRequest}
                    onSubmit={handleSubmit} />
            </div>
            :
            <div
                onClick={OnIconClicked}
                className={`fade-in flex items-center gap-2 duration-150 hover:scale-105 hover:shadow-lg transition-all`}
            >
                <div
                    className="w-11 h-11 rounded-full bg-[#7aa2f7] flex items-center justify-center text-[#1a1b26] font-bold cursor-pointer select-none"
                    title={userName}
                >
                    {initials || "U"}
                </div>
                <span className="text-[#c0caf5] font-semibold hidden sm:inline">
                    {userName}
                </span>
            </div>
    );
};

export default UserTopIcon;
