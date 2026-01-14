import { useState } from "react";
import ErrorHint from "../../shared/ErrorHint";
import {getErrorMessageForSignUp} from "../../../hooks/users/userErrorHelper";
import { useUserContext } from "../../../context/users/userContext";

export const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const ctx = useUserContext();

   
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        ctx.signup(email, username, password);
    };

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
            <form
                onSubmit={handleSubmit}
                className=" fade-in w-full max-w-sm bg-[#1a1b26] border border-[#2a2f47] rounded-xl p-8 shadow-[0_0_30px_rgba(122,162,247,0.15)] flex flex-col gap-5 " >
                <h2 className="text-2xl font-bold text-purple-400 text-center">
                    Sign Up
                </h2>

                {/* Email */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-[#c0caf5]">Email</label>
                    <input
                        type="email"
                        name="email"
                        autoComplete="new-email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className=" px-3 py-2 bg-[#16161e] border border-[#2a2f47] rounded-md text-[#c0caf5] outline-none focus:border-[#7aa2f7] focus:shadow-[0_0_10px_rgba(122,162,247,0.35)] transition-all "
                    />
                </div>
                <ErrorHint 
                    message={getErrorMessageForSignUp(ctx.signupError)}
                    toValidate={ctx.isEmailError() ? "" : "valid"}
                    triggerCheck={ctx.isEmailError()} />

                {/* Username */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-[#c0caf5]">Username</label>
                    <input
                        type="user"
                        name="user"
                        autoComplete="new-user"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                        className=" px-3 py-2 bg-[#16161e] border border-[#2a2f47] rounded-md text-[#c0caf5] outline-none focus:border-[#7aa2f7] focus:shadow-[0_0_10px_rgba(122,162,247,0.35)] transition-all
                        "
                    />
                </div>
                <ErrorHint
                    message={getErrorMessageForSignUp(ctx.signupError)}
                    toValidate={ctx.isUserError() ? "" : "valid"}
                    triggerCheck={ctx.isUserError()} />

                {/* Password */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-[#c0caf5]">Password</label>
                    <input
                        type="password"
                        name="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className=" px-3 py-2 bg-[#16161e] border border-[#2a2f47] rounded-md text-[#c0caf5] outline-none focus:border-[#7aa2f7] focus:shadow-[0_0_10px_rgba(122,162,247,0.35)] transition-all "
                    />
                </div>
                <ErrorHint 
                    message={getErrorMessageForSignUp(ctx.signupError)}
                    toValidate={ctx.isPasswordError() ? "" : "valid"} 
                    triggerCheck={ctx.isPasswordError()} />

                {/* Submit */}
                <button
                    type="submit"
                    className=" mt-2 py-2 rounded-md border-1 border-[#7aa2f7] text-[#7aa2f7] font-semibold tracking-wide hover:shadow-[0_0_14px_rgba(122,162,247,0.6)] hover:bg-[#7aa2f7] hover:text-[#1a1b26] transition-all active:scale-95 cursor-pointer "
                >
                    Sign Up
                </button>

                {/* Footer */}
                <p className="text-xs text-center text-[#565f89]">
                    Noteveil © {new Date().getFullYear()}
                </p>
            </form>
        </div>
    );
};
