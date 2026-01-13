import { useState } from "react";
import { Login } from "../compositional/Login";
import { Signup } from "../compositional/Signup";
import { signUpErrorType } from "../../../types/userTypes";

interface LoginScreenProps{
    onLogin: (email:string, password:string) => void;
    onSignup: (email:string, username: string, password:string) => void;
    isLogin: boolean;
    loginError: boolean;
    signupError: signUpErrorType;
    onLoginScreenOpen: () => void;
    onSignupScreenOpen: () => void;
}

export const LoginScreen = ({ onLogin, onSignup, onLoginScreenOpen, onSignupScreenOpen, isLogin, loginError, signupError }: LoginScreenProps) => {

    return ( 
           isLogin ? 
           <Login onLogin={onLogin} loginError={loginError} onSignupScreenOpen={onSignupScreenOpen}/>
           :
           <Signup onSignup={onSignup} onLoginScreenOpen={onLoginScreenOpen} signupError={signupError}/>
           );
};

export default LoginScreen;
