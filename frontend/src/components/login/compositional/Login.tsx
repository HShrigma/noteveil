import { useState } from "react";
import ErrorHint from "../../shared/ErrorHint";
import { invalidLoginMsg } from "../../../utils/registries";
import { useUserContext } from "../../../context/users/userContext";
import { CredentialResponse, GoogleLogin, TokenResponse } from "@react-oauth/google";
import GoogleButton from "./GoogleButton";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const ctx = useUserContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await ctx.login(email, password);
    };


    const handleGoogleSuccess = (res: TokenResponse): void => {

        console.log(`Success: ${res.access_token}`);
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

            <form
                onSubmit={handleSubmit}
                className=" fade-in w-full max-w-sm bg-[#1a1b26] border border-[#2a2f47] rounded-xl p-8 shadow-[0_0_30px_rgba(122,162,247,0.15)] flex flex-col gap-5 " >
                <h2 className="text-2xl font-bold text-purple-400 text-center">
                    Log in
                </h2>

                {/* Email */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-[#c0caf5]">Email</label>
                    <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className=" px-3 py-2 bg-[#16161e] border border-[#2a2f47] rounded-md text-[#c0caf5] outline-none focus:border-[#7aa2f7] focus:shadow-[0_0_10px_rgba(122,162,247,0.35)] transition-all"
                    />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-[#c0caf5]">Password</label>
                    <input
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className=" px-3 py-2 bg-[#16161e] border border-[#2a2f47] rounded-md text-[#c0caf5] outline-none focus:border-[#7aa2f7] focus:shadow-[0_0_10px_rgba(122,162,247,0.35)] transition-all"
                    />
                </div>

                <ErrorHint
                    message={invalidLoginMsg}
                    toValidate={ctx.loginError ? "" : "valid"}
                    triggerCheck={ctx.loginError}
                />
                {/* Submit */}
                <button
                    type="submit"
                    className=" mt-2 py-2 rounded-md border-1 border-[#7aa2f7] text-[#7aa2f7] font-semibold tracking-wide hover:shadow-[0_0_14px_rgba(122,162,247,0.6)] hover:bg-[#7aa2f7] hover:text-[#1a1b26] transition-all active:scale-95 cursor-pointer" >
                    Login
                </button>

                {/* Footer */}
                <p className="text-xs text-center text-[#565f89]">
                    Noteveil © {new Date().getFullYear()}
                </p>
            </form>
            OR
            {/* Google Login */}
            <GoogleButton onLoginSuccess={handleGoogleSuccess} onLoginFailure={handleGoogleError} />
        </div>

    );
}