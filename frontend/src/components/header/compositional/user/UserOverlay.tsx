import { LogOutIcon, X } from "lucide-react";
import UserTopIcon from "./UserTopIcon";
import { UserData } from "../../../../types/userTypes";
import UserAccountDeleter from "./UserAccountDeleter";
import UserPasswordUpdater from "./UserPasswordUpdater";

interface UserOverlayProps {
    user: UserData;
    isOpen: boolean;
    onClose: () => void;
    onLogout: (withMessage?: boolean) => void;
    onUserPasswordChange: (newPass: string) => void;
    onUsernameUpdate: (newName:string)=> void;
    onUserDelete: (id: number) => void;
}

const UserOverlay = ({ user, isOpen, onClose, onLogout, onUserDelete, onUserPasswordChange, onUsernameUpdate }: UserOverlayProps) => {
    return (
        <>
            {/* On/Off Background */}
            <div
                className={`fixed inset-0 bg-transparent ${isOpen ? " pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={onClose}></div>

            {/* Sidebar panel */}
            <div
                className={`fixed top-0 right-0 h-full w-4/12 bg-[#1a1b26] shadow-2xl transform transition-transform duration-300 slide-left ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="p-6  flex justify-between items-center border-b border-[#2a2f47]">
                    <UserTopIcon 
                        userName={user.userName}
                        OnIconClicked={onClose}
                        isActive={isOpen}
                        onUsernameUpdate={onUsernameUpdate} />
                    <button
                        className="cursor-pointer fade-in p-2 rounded-full border-2 border-purple-400 hover:shadow-[0_0_10px_rgba(157,124,216,0.35)] hover:bg-purple-400 hover:text-[#1a1b26] hover:font-extrabold"
                        onClick={onClose}
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="fade-in p-6 text-[#c0caf5] flex flex-col gap-3">
                    <UserPasswordUpdater
                        user={user}
                        onPasswordChange={onUserPasswordChange}
                        resetKey={isOpen} />
                    <button
                        onClick={() => onLogout(true)}
                        className=" flex items-center font-medium border-1 gap-2 p-2 rounded-md text-[#c0caf5] hover:bg-purple-400 hover:text-[#1a1b26] transition-colors cursor-pointer"
                    >
                        <LogOutIcon /> Logout
                    </button>
                    <UserAccountDeleter
                        user={user}
                        onUserDelete={onUserDelete}
                        onLogout={onLogout}
                        resetKey={isOpen}
                    />
                </div>
            </div>
        </>
    );
};

export default UserOverlay;
