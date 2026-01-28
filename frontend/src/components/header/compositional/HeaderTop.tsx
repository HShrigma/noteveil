import { useUserContext } from "../../../context/users/userContext";
import User from "./user/User";
import logo from '../../../assets/logo.svg';

interface HeaderTopProps {
    onLogout: (withMessage?: boolean) => void;
}

const HeaderTop = ({  onLogout, }: HeaderTopProps) => {
    const ctx = useUserContext();
    return (
        <div className={`flex items-center ${!ctx.isUserLoggedIn() ? "justify-center" : "justify-between"}`}>
            {/* Title */}
            <h1 className={`flex items-center text-3xl md:text-4xl font-bold tracking-wider   bg-gradient-to-b from-[#8f44cfff] to-purple-400 bg-clip-text text-transparent ${!ctx.isUserLoggedIn() ? "fade-in scale-105" : "slide-left"}`}>
                <img draggable={false} src={logo} alt="N" className="cursor-text inline w-15 h-15 mr-2" />oteveil
            </h1>

            {/* User */}
            {ctx.isUserLoggedIn() && <User onLogout={onLogout} />}
        </div>
    );
};

export default HeaderTop;