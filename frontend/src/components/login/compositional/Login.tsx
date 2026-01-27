import { useUserContext } from "../../../context/users/userContext";
import GoogleButton from "./GoogleButton";
import LoginForm from "./LoginForm";

export const Login = () => {
    const ctx = useUserContext();

    return (
        <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center gap-4">
            {/* Floating Logout Notice */}
            {ctx.authLogoutNotice && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 border-2  border-red-400 text-red-400 font-bold px-6 py-3 rounded-lg shadow-[0_0_10px_rgba(239,83,80,0.3)] z-50 transition-all fade-in-out">
                    Logged out due to inactivity
                </div>
            )}
            <span> don't have an account?
                <button
                    className=" px-4 py-2 mx-2.5 border-1 border-[#7aa2f7] text-[#7aa2f7] font-semibold rounded-lg shadow-[0_0_10px_rgba(122,162,247,0.3)] hover:bg-[#7aa2f7] hover:text-[#1a1b26] hover:shadow-[0_0_14px_rgba(122,162,247,0.6)] transition-all active:scale-95 cursor-pointer"
                    onClick={ctx.openSignupScreen}>
                    Sign Up
                </button>
            </span>

            {/* Login Form */}
            <LoginForm />
            OR
            {/* Google Login */}
            <GoogleButton signIn={true} />
        </div>

    );
}