import { useState } from "react";
import { Login } from "../compositional/Login";
import { Signup } from "../compositional/Signup";

interface LoginScreenProps{
    onLogin: (email:string, password:string) => void;
    onSignup: (email:string, username: string, password:string) => void;
    loginError: boolean;
}

export const LoginScreen = ({ onLogin, onSignup, loginError }: LoginScreenProps) => {
    const [isLogin, setIsLogin] = useState(true);

    return ( 
           isLogin ? 
           <Login onLogin={onLogin} loginError={loginError} onSignupScreenOpen={() => setIsLogin(false)}/>
           :
           <Signup onSignup={onSignup} onLoginScreenOpen={() => setIsLogin(true)} signupError={false}/>
           );
};

export default LoginScreen;
