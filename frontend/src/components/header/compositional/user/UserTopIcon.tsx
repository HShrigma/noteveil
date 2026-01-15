import { useEffect, useState } from "react";
import EditableTitle from "../../../shared/title/EditableTitle";
import { discardMsgUsername } from "../../../../utils/registries";
import { useUserContext } from "../../../../context/users/userContext";
import ErrorHint from "../../../shared/ErrorHint";
import { getErrorMessageForSignUp } from "../../../../hooks/users/userErrorHelper";

interface UserTopIconProps {
    isActive: boolean;
    OnIconClicked: () => void;
}

const UserTopIcon = ({ OnIconClicked, isActive, }: UserTopIconProps) => {
    const ctx = useUserContext();

    const [isEditing, setIsEditing] = useState(false);
    const [userField, setUserField] = useState(ctx.getUsername());
    const [error, setError] = useState("");

    useEffect(() => {
        if(isActive) setUserField(ctx.getUsername());
        setError("");
        setIsEditing(false);
    },[isActive]);

    useEffect(() => {
        setUserField(ctx.getUsername());
        setError("");
    }, [ isEditing])

    const onActivityRequest = (wantsActive: boolean, value: string) => {
        if (wantsActive && !isEditing) {
            setIsEditing(true);
            setError("");
            return;
        }
        if (!wantsActive && isEditing) {
            setIsEditing(false);
            setError("");
            setUserField(ctx.getUsername());
            return;
        }
    }
    const handleSubmit = async (newValue: string) => {
        const err = await ctx.updateUserName(newValue);
        if (err !== null){
            setError(getErrorMessageForSignUp(err));
            return;
        }
        setIsEditing(false);
    }
    const initials = ctx.getUsername()
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase();

    return (
        isActive ?
            <div
                className={`fade-in flex items-start gap-2 duration-150`}
            >
                <div
                    className="w-11 h-11 rounded-full bg-[#7aa2f7] flex items-center justify-center text-[#1a1b26] font-bold  select-none"
                    title={ctx.getUsername()}
                >
                    {initials || "U"}
                </div>
                <div className="min-w-0 max-w-1/2 flex flex-col">
                    <EditableTitle
                        title={userField}
                        isActive={isEditing}
                        discardMsg={discardMsgUsername}
                        onActivityRequest={onActivityRequest}
                        onSubmit={handleSubmit} />
                    <ErrorHint
                        message={error}
                        toValidate={error ? "" : "valid"}
                        triggerCheck={!!error}
                    />

                </div>
            </div>
            :
            <div
                onClick={OnIconClicked}
                className={`fade-in flex items-center gap-2 duration-150 hover:scale-105 hover:shadow-lg transition-all`}
            >
                <div
                    className="w-11 h-11 rounded-full bg-[#7aa2f7] flex items-center justify-center text-[#1a1b26] font-bold cursor-pointer select-none"
                    title={ctx.getUsername()}
                >
                    {initials || "U"}
                </div>
                <span className="text-[#c0caf5] font-semibold hidden sm:inline">
                    {ctx.getUsername()}
                </span>
            </div>
    );
};

export default UserTopIcon;
