import { UserType } from "../../../types/userTypes";
import { MAIN_STATES, MainState } from "../../../utils/registries";
import User from "./user/User";
interface HeaderTopProps {
    user: UserType;
    onLogout: () => void;
}

const HeaderTop = ({user, onLogout }: HeaderTopProps) => {
    const isLogin = user === null;

    return (
        <div className={`flex items-center ${isLogin ? "justify-center" : "justify-between"}`}>
            {/* Title */}
            <h1 className={`text-3xl md:text-4xl font-bold tracking-wider text-purple-400 ${isLogin ? "fade-in scale-105" : "slide-left"}`}>
                Noteveil
            </h1>

            {/* User */}
            {!isLogin && <User user={user} onLogout={onLogout} />}
        </div>
    );
};

export default HeaderTop;
