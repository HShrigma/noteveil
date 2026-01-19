import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";
import { useUserContext } from "../../../context/users/userContext";
import ErrorHint from "../../shared/ErrorHint";
import { useEffect, useState } from "react";

interface GoogleButtonProps {
    signIn?: boolean;
}

export const GoogleButton = ({ signIn }: GoogleButtonProps) => {
    const [error, setError] = useState(false);
    useEffect(()=> setError(false), []);

    const ctx = useUserContext();
    const login = useGoogleLogin({
        onSuccess: ctx.useGoogleApi,
        flow: "implicit",
    });

    return (
        <div>

            <button
                onClick={() => {
                    try {
                        login();
                    } catch (error) {
                        console.error("Google login failed", error);
                        setError(true);
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
                <FaGoogle size="25" /> {`Sign ${signIn ? "in" : "up"} with Google`}
            </button>
            <ErrorHint message={`Google sign ${signIn ? "in" : "up"} failed. Please try Again.`} toValidate={""} triggerCheck={false} />
        </div>
    );
};

export default GoogleButton;