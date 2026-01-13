import React, { useEffect, useState } from "react";
import ConfirmDeleteButton from "../../../shared/ConfirmDeleteButton";
import ErrorHint from "../../../shared/ErrorHint";
import { UserData } from "../../../../types/userTypes";
import { deleteAccountMsg } from "../../../../utils/registries";

interface UserAccountDeleterProps {
    user: UserData;
    onUserDelete: (id: number) => void;
    onLogout: () => void;
    resetKey?: any;
}

const UserAccountDeleter = ({ user, onUserDelete, onLogout, resetKey }: UserAccountDeleterProps) => {
    const [isDelete, setIsDelete] = useState(false);
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsDelete(false);
        setPassword("");
        setIsError(false);
    }, [resetKey]);

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== user.password) {
            setIsError(true);
            return;
        }
        if (!window.confirm(deleteAccountMsg)) return;
        setIsDelete(false);
        setIsError(false);
        setPassword("");
        onUserDelete(user.id);
        onLogout();
    };

    return (
        <div>
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

                    <ErrorHint
                        message="Incorrect Password"
                        toValidate={isError ? "" : "valid"}
                        triggerCheck={isError}
                    />
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
    );
};

export default UserAccountDeleter;
