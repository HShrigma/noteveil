import { LogOutIcon, X } from "lucide-react";
import UserTopIcon from "./UserTopIcon";
import UserAccountDeleter from "./UserAccountDeleter";
import UserPasswordUpdater from "./UserPasswordUpdater";
import { useUserContext } from "../../../../context/users/userContext";

interface UserOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    onLogout: (withMessage?: boolean) => void;
}

const UserOverlay = ({ isOpen, onClose, onLogout, }: UserOverlayProps) => {
    const ctx = useUserContext();

    return (
        ctx.user !== null &&
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
                <div className="p-6  flex justify-between items-start border-b border-[#2a2f47]">
                    <UserTopIcon OnIconClicked={onClose} isActive={isOpen}/>
                    <button
                        className="cursor-pointer fade-in p-2 rounded-full border-2 border-purple-400 hover:shadow-[0_0_10px_rgba(157,124,216,0.35)] hover:bg-purple-400 hover:text-[#1a1b26] hover:font-extrabold"
                        onClick={onClose}
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="inline-grid auto-rows fade-in p-6 text-[#c0caf5]  items-baseline w-max gap-4">
                    {!ctx.fromAuth && <UserPasswordUpdater resetKey={isOpen} /> }
                    <button onClick={() => onLogout(true)} className=" flex items-center font-medium border-1 gap-2 p-2 rounded-md text-[#c0caf5] hover:bg-purple-400 hover:text-[#1a1b26] hover:shadow-[0_0_8px_2px_rgba(157,124,216,0.35)] transition-colors cursor-pointer">
                        <LogOutIcon className="inline" /> Logout
                    </button>
                    <UserAccountDeleter
                        className=""
                        onLogout={onLogout}
                        resetKey={isOpen}
                    />
                </div>
            </div>
        </>
    );
};

export default UserOverlay;
