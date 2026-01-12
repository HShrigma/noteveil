import { useState } from "react";

interface LoginProps{
    onLogin: (email:string, password:string) => void;
}

export const Login = ({ onLogin }: LoginProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Stub: hook real auth here later
        console.log("Login attempt:", { email, password });
        onLogin(email,password);
    };

    return (
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="
                    fade-in
                    w-full max-w-sm
                    bg-[#1a1b26]
                    border border-[#2a2f47]
                    rounded-xl
                    p-8
                    shadow-[0_0_30px_rgba(122,162,247,0.15)]
                    flex flex-col gap-5
                "
            >
                <h2 className="text-2xl font-bold text-purple-400 text-center">
                    Sign in
                </h2>

                {/* Email */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-[#c0caf5]">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="
                            px-3 py-2
                            bg-[#16161e]
                            border border-[#2a2f47]
                            rounded-md
                            text-[#c0caf5]
                            outline-none
                            focus:border-[#7aa2f7]
                            focus:shadow-[0_0_10px_rgba(122,162,247,0.35)]
                            transition-all
                        "
                    />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-[#c0caf5]">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="
                            px-3 py-2
                            bg-[#16161e]
                            border border-[#2a2f47]
                            rounded-md
                            text-[#c0caf5]
                            outline-none
                            focus:border-[#7aa2f7]
                            focus:shadow-[0_0_10px_rgba(122,162,247,0.35)]
                            transition-all
                        "
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="
                        mt-2
                        py-2 rounded-md
                        bg-[#7aa2f7]
                        text-[#1a1b26]
                        font-semibold
                        tracking-wide
                        hover:shadow-[0_0_14px_rgba(122,162,247,0.6)]
                        transition-all
                        active:scale-95
                    "
                >
                    Login
                </button>

                {/* Footer */}
                <p className="text-xs text-center text-[#565f89]">
                    Noteveil © {new Date().getFullYear()}
                </p>
            </form>
        </div>
    );
};

export default Login;
