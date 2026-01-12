import { MAIN_STATES, MainState } from "../../../utils/registries";
import User from "./user/User";
interface HeaderTopProps {
    onLogout: () => void;
    currentState: MainState;
}

const HeaderTop = ({ currentState, onLogout }: HeaderTopProps) => {
    const isLogin = currentState === MAIN_STATES.LOGIN_DISPLAY;

    return (
        <div className={`flex items-center ${isLogin ? "justify-center" : "justify-between"}`}>
            {/* Title */}
            <h1 className={`text-3xl md:text-4xl font-bold tracking-wider text-purple-400 ${isLogin ? "fade-in scale-105" : "slide-left"}`}>
                Noteveil
            </h1>

            {/* User */}
            {!isLogin && <User onLogout={onLogout} />}
        </div>
    );
};

export default HeaderTop;
