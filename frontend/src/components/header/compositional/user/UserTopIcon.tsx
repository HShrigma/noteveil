interface UserTopIconProps {
    isActive: boolean;
    userName?: string; 
    OnIconClicked: () => void;
}

const UserTopIcon = ({ userName = "User", OnIconClicked, isActive}: UserTopIconProps) => {
    // Compute initials from the name
    const initials = userName
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase();

    return (
        <div 
            onClick={OnIconClicked}
            className={`fade-in flex items-center gap-2 duration-150 ${isActive ? "" : "hover:scale-105 hover:shadow-lg transition-all"}`} 
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
