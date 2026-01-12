interface UserIconProps {
    userName?: string; // optional, default to "User"
    OnIconClicked: () => void;
}

const UserTopIcon = ({ userName = "User", OnIconClicked }: UserIconProps) => {
    // Compute initials from the name
    const initials = userName
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase();

    return (
        <div className="flex items-center gap-2">
            <div 
                className="w-10 h-10 rounded-full bg-[#7aa2f7] flex items-center justify-center text-[#1a1b26] font-bold cursor-pointer"
                onClick={OnIconClicked}
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
