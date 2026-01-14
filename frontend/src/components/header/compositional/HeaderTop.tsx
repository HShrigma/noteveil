import { useUserContext } from "../../../context/users/userContext";
import User from "./user/User";
interface HeaderTopProps {
    onLogout: (withMessage?: boolean) => void;
}

const HeaderTop = ({  onLogout, }: HeaderTopProps) => {
    const ctx = useUserContext();
    return (
        <div className={`flex items-center ${!ctx.isUserLoggedIn() ? "justify-center" : "justify-between"}`}>
            {/* Title */}
            <h1 className={`text-3xl md:text-4xl font-bold tracking-wider text-purple-400 ${!ctx.isUserLoggedIn() ? "fade-in scale-105" : "slide-left"}`}>
                Noteveil
            </h1>

            {/* User */}
            {ctx.isUserLoggedIn() && <User onLogout={onLogout} />}
        </div>
    );
};

export default HeaderTop;