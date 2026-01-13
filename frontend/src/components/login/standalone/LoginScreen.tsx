import { useState } from "react";

interface LoginScreenProps{
    onLogin: (email:string, password:string) => void;
    loginError: boolean;
}

export const LoginScreen = ({ onLogin, loginError }: LoginScreenProps) => {
    const [isLogin, setIsLogin] = useState(true);
    return ( 
           <LoginScreen onLogin={onLogin} loginError={loginError}/>
           );
};

export default LoginScreen;
