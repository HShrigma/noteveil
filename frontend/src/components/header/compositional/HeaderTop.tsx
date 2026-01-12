import { UserIcon } from "lucide-react";
import UserTopIcon from "./user/UserTopIcon";

interface HeaderTopProps {
    userName?: string; // optional, default to "User"
}

const HeaderTop = ({ userName = "User" }: HeaderTopProps) => {
    const initials = userName
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase();

    return (
        <div className="flex justify-between items-center">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-purple-400 tracking-wider">
                Noteveil
            </h1>
            {/* User */}
            <UserTopIcon  OnIconClicked={() => console.log("clicked")} />
        </div>
    );
};

export default HeaderTop;
