import { useState } from "react";
import { Login } from "../compositional/Login";
import { Signup } from "../compositional/Signup";
import { signUpErrorType } from "../../../types/userTypes";

interface LoginScreenProps{
    onLogin: (email:string, password:string) => void;
    onSignup: (email:string, username: string, password:string) => void;
    loginError: boolean;
    signupError: signUpErrorType;
}

export const LoginScreen = ({ onLogin, onSignup, loginError, signupError }: LoginScreenProps) => {
    const [isLogin, setIsLogin] = useState(true);

    return ( 
           isLogin ? 
           <Login onLogin={onLogin} loginError={loginError} onSignupScreenOpen={() => setIsLogin(false)}/>
           :
           <Signup onSignup={onSignup} onLoginScreenOpen={() => setIsLogin(true)} signupError={signupError}/>
           );
};

export default LoginScreen;
