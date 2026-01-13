import { LogOutIcon, X } from "lucide-react";
import UserTopIcon from "./UserTopIcon";
import { UserData } from "../../../../types/userTypes";
import React, { useEffect, useState } from "react";
import ConfirmDeleteButton from "../../../shared/ConfirmDeleteButton";
import ErrorHint from "../../../shared/ErrorHint";

interface UserOverlayProps {
    user: UserData;
    isOpen: boolean;
    onClose: () => void;
    onLogout: () => void;
    onUserDelete: (id:number) => void;
}

const UserOverlay = ({ user, isOpen, onClose, onLogout , onUserDelete}: UserOverlayProps) => {
    const [isDelete, setIsDelete] = useState(false);
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);

    useEffect(() => { setIsDelete(false); setPassword(""); setIsError(false); }, [isOpen]);

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== user.password) {
            setIsError(true);
            return;
        }
        setIsDelete(false);
        setIsError(false);
        setPassword("");
        onUserDelete(user.id);
        onLogout();
    }
    return (
        <>
            {/* On/Off Background */}
            <div
                className={`fixed inset-0 bg-transparent ${isOpen ? " pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={onClose}></div>

            {/* Sidebar panel */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-[#1a1b26] shadow-2xl transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="p-6  flex justify-between items-center border-b border-[#2a2f47]">
                    <UserTopIcon userName={user.userName} OnIconClicked={onClose} isActive={false} />
                    <button
                        className="cursor-pointer fade-in p-2 rounded-full border-2 border-purple-400 hover:shadow-[0_0_10px_rgba(157,124,216,0.35)] hover:bg-purple-400 hover:text-[#1a1b26] hover:font-extrabold"
                        onClick={onClose}
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="fade-in p-6 text-[#c0caf5] flex flex-col gap-3">
                    <button
                        onClick={onLogout}
                        className=" flex items-center font-medium border-1 gap-2 p-2 rounded-md text-[#c0caf5] hover:bg-purple-400 hover:text-[#1a1b26] transition-colors cursor-pointer">
                        <LogOutIcon /> Logout
                    </button>
                    {isDelete ? (
                        <form
                            onSubmit={onFormSubmit}
                            className="mt-4 flex flex-col gap-3 p-4 border border-red-500/40 rounded-md bg-[#16161e]"
                        >
                            <p className="text-sm text-red-400">
                                Enter your password to permanently delete your account.
                            </p>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                autoComplete="new-password"
                                autoFocus
                                className="bg-[#1a1b26] border border-[#2a2f47] rounded-md px-3 py-2 text-[#c0caf5] focus:outline-none focus:border-red-400"
                            />

                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsDelete(false);
                                        setPassword("");
                                    }}
                                    className="flex-1 px-3 py-2 rounded-md border border-[#2a2f47] hover:bg-[#2a2f47]"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={!password}
                                    className="flex-1 px-3 py-2 rounded-md bg-red-500 text-[#1a1b26] font-semibold disabled:opacity-50"
                                >
                                    Delete
                                </button>
                            </div>
                            <ErrorHint message={"Incorrect Password"} toValidate={isError ? "":"valid"} triggerCheck={isError}/>
                        </form>
                    ) : (
                        <ConfirmDeleteButton
                            label="Delete Account"
                            confirmLabel="Are you sure?"
                            color="red"
                            confirmColor="yellow"
                            onConfirm={() => setIsDelete(true)}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default UserOverlay;
