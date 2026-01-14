import { useEffect, useState } from "react";
import EditableTitle from "../../../shared/title/EditableTitle";
import { discardMsgUsername } from "../../../../utils/registries";
import { useUserContext } from "../../../../context/users/userContext";

interface UserTopIconProps {
    isActive: boolean;
    OnIconClicked: () => void;
}

const UserTopIcon = ({ OnIconClicked, isActive, }: UserTopIconProps) => {
    const ctx = useUserContext();

    const [isEditing,setIsEditing] = useState(false);
    const [userField,setUserField] = useState(ctx.getUserName());


    useEffect(()=>{
        setUserField(ctx.getUserName());
    },[isActive,isEditing])

    const onActivityRequest = (wantsActive:boolean, value:string) => {
        if (wantsActive && !isEditing) {
            setIsEditing(true); 
            return;
        }
        if (!wantsActive && isEditing) {
            setIsEditing(false);
            setUserField(ctx.getUserName());
            return;
        }
    }
    const handleSubmit = async (newValue:string) => {
        await ctx.updateUserName(newValue);
        setIsEditing(false);
    }
    const initials = ctx.getUserName()
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
                    title={ctx.getUserName()}
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
                    title={ctx.getUserName()}
                >
                    {initials || "U"}
                </div>
                <span className="text-[#c0caf5] font-semibold hidden sm:inline">
                    {ctx.getUserName()}
                </span>
            </div>
    );
};

export default UserTopIcon;
