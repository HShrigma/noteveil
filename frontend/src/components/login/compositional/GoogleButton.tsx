import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";

interface GoogleButtonProps {
    label?: string;
    onLoginSuccess?: (res: TokenResponse) => void;
    onLoginFailure?: () => void;
}

export const GoogleButton = ({ label, onLoginSuccess, onLoginFailure }: GoogleButtonProps) => {
    const login = useGoogleLogin({
        onSuccess: onLoginSuccess,
        flow: "implicit",
    });

    return (
        <button
            onClick={() => {
                try {
                    login();
                } catch (error) {
                    console.error("Google login failed", error);
                    onLoginFailure?.();
                }
            }}
            className="
            flex items-center justify-center gap-3
            w-full max-w-sm
            px-4 py-2
           bg-[#1a1b26] text-purple-400 font-semibold
            border border-purple-400 rounded-lg
            shadow-md
            hover:shadow-[0_0_20px_4px_rgba(194,122,255,0.7)]
            hover:text-[#1a1b26] hover:bg-purple-400
            transition-all duration-200
            active:scale-95 cursor-pointer
            "
        >
            <FaGoogle size="25"/> {label ?? "Sign in with Google"}
        </button>
    );
};

export default GoogleButton;
