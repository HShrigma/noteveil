import { useState } from "react";
import ErrorHint from "../../shared/ErrorHint";
import { getErrorMessageForSignUp } from "../../../hooks/users/userErrorHelper";
import { useUserContext } from "../../../context/users/userContext";
import GoogleButton from "./GoogleButton";
import SignupForm from "./SignupForm";

export const Signup = () => {
    const ctx = useUserContext();

    return (
        <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center gap-4">

            {/* Back to Login Button */}
            <span>
                Already have an account?
                <button
                    className=" px-4 py-2 mx-2.5 border-1 border-[#7aa2f7] text-[#7aa2f7] font-semibold rounded-lg shadow-[0_0_10px_rgba(122,162,247,0.3)] hover:bg-[#7aa2f7] hover:text-[#1a1b26] hover:shadow-[0_0_14px_rgba(122,162,247,0.6)] transition-all active:scale-95 cursor-pointer "
                    onClick={ctx.openLoginScreen}
                >
                    Login
                </button>
            </span>

            {/* Signup Form */}
            <SignupForm />
            OR
            {/* Google Signup */}
            <GoogleButton
                label="Sign up with Google"
                onLoginFailure={() => console.error("SIGNUP failed")}
                onLoginSuccess={(res) => console.log("SIGNUP success: " + res.access_token)} />
        </div>
    );
};
