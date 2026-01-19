import { useState } from "react";
import ErrorHint from "../../shared/ErrorHint";
import { invalidLoginMsg } from "../../../utils/registries";
import { useUserContext } from "../../../context/users/userContext";
import { TokenResponse } from "@react-oauth/google";
import GoogleButton from "./GoogleButton";
import LoginForm from "./LoginForm";

export const Login = () => {
    const ctx = useUserContext();

    const handleGoogleSuccess = (res: TokenResponse): void => {
        console.log(`Success: ${res.access_token}\nExpires: ${res.expires_in}`);
    }

    const  handleGoogleError = (): void =>{
        console.error("Failure");
    }

    return (
        <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center gap-4">
            <span> don't have an account?
                <button
                    className=" px-4 py-2 mx-2.5 border-1 border-[#7aa2f7] text-[#7aa2f7] font-semibold rounded-lg shadow-[0_0_10px_rgba(122,162,247,0.3)] hover:bg-[#7aa2f7] hover:text-[#1a1b26] hover:shadow-[0_0_14px_rgba(122,162,247,0.6)] transition-all active:scale-95 cursor-pointer"
                    onClick={ctx.openSignupScreen}>
                    Sign Up
                </button>
            </span>
            {/* Login Form */}
            <LoginForm/>
            OR
            {/* Google Login */}
            <GoogleButton onLoginSuccess={handleGoogleSuccess} onLoginFailure={handleGoogleError} />
        </div>

    );
}