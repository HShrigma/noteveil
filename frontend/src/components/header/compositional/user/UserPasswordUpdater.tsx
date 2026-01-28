import React, { useState, useEffect } from "react";
import ErrorHint from "../../../shared/ErrorHint";
import { useUserContext } from "../../../../context/users/userContext";
import { getErrorMessageForSignUp } from "../../../../hooks/users/userErrorHelper";


interface UserPasswordUpdaterProps {
    resetKey?: any;
}

const UserPasswordUpdater = ({ resetKey }: UserPasswordUpdaterProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [current, setCurrent] = useState("");
    const [confirmCurrent, setConfirmCurrent] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmNew, setConfirmNew] = useState("");
    const [error, setError] = useState("");

    const ctx = useUserContext();
    useEffect(() => {
        setIsEditing(false);
        setCurrent("");
        setConfirmCurrent("");
        setNewPass("");
        setConfirmNew("");
        setError("");
    }, [resetKey]);

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const passErr = await ctx.updatePassword(current, confirmCurrent, newPass, confirmNew);
        if(passErr !== null){
            setError(getErrorMessageForSignUp(passErr));
            return;
        }
        // all good
        setIsEditing(false);
        setCurrent("");
        setConfirmCurrent("");
        setNewPass("");
        setConfirmNew("");
        setError("");
    };

    const formFieldClassname = "bg-[#1a1b26] border border-[#2a2f47] rounded-md px-3 py-2 text-[#c0caf5] focus:outline-none focus:border-purple-400 focus:!shadow-[0_0_8px_2px_rgba(157,124,216,0.35)]";
    return (
        <div className="w-full">
            {isEditing ? (
                <form
                    onSubmit={onFormSubmit}
                    className="flex flex-col gap-3 p-4 border border-purple-400 shadow-[0_0_8px_2px_rgba(157,124,216,0.35)] rounded-md bg-[#16161e]"
                >
                    <input
                        type="password"
                        placeholder="Current Password"
                        value={current}
                        onChange={(e) => setCurrent(e.target.value)}
                        autoComplete="current-password"
                        className={formFieldClassname}
                        autoFocus
                    />

                    <input
                        type="password"
                        placeholder="Confirm Current Password"
                        value={confirmCurrent}
                        onChange={(e) => setConfirmCurrent(e.target.value)}
                        autoComplete="off"
                        className={formFieldClassname}
                    />

                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        autoComplete="new-password"
                        className={formFieldClassname}
                    />

                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmNew}
                        onChange={(e) => setConfirmNew(e.target.value)}
                        autoComplete="new-password"
                        className={formFieldClassname}
                    />

                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="flex-1 px-3 py-2 rounded-md border-1 cursor-pointer hover:bg-red-500 hover:text-[#1a1b26] hover:font-bold"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={!current || !confirmCurrent || !newPass || !confirmNew}
                            className={`flex-1 px-3 py-2 rounded-md border-2 border-purple-400 disabled:bg-purple-400 disabled:text-[#1a1b26] hover:text-[#1a1b26] hover:bg-purple-400 font-semibold disabled:opacity-50 cursor-pointer disabled:cursor-auto`}
                        >
                            Update
                        </button>
                    </div>

                    <ErrorHint
                        message={error}
                        toValidate={error ? "" : "valid"}
                        triggerCheck={!!error}
                    />
                </form>
            ) : (
                <button
                    type="button"
                    className="w-full flex items-center px-3 py-2 rounded-md border-2 hover:bg-purple-400 hover:text-[#1a1b26] hover:shadow-[0_0_8px_2px_rgba(157,124,216,0.35)] cursor-pointer"
                    onClick={() => setIsEditing(true)}
                >
                    Change Password
                </button>)}
        </div>
    );
};

export default UserPasswordUpdater;