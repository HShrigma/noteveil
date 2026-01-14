import { useState } from "react";
import { signUpErrorType, UserContextResult, UserData, UserType } from "../../types/userTypes";
import { createTempId } from "../../utils/mathUtils";
import { getSignupLengthError,  isErrorTypeEmail, isErrorTypePassword, isErrorTypeUser, isPasswordValid } from "./userErrorHelper";

const sampleUser: UserData = {
    id: 1,
    userName: "test",
    email: "sample@mail.com",
    password: "123!@#ABCabc"
};

export function useUsers(onLoginSuccess: () => void, onLogoutSuccess: () => void) {
    const [user, setUser] = useState<UserType>(null);
    const [tempUsers, setTempUsers] = useState<UserData[]>([sampleUser]);

    const [loginError, setLoginError] = useState(false);
    const [signupError, setSignupError] = useState<signUpErrorType>(null);
    const [isLogin, setIsLogin] = useState(true);

    
    const getSignupValidationError = (
        email: string,
        userName: string,
        password: string
    ): signUpErrorType => {
        const lengthErr = getSignupLengthError(userName, password);
        if (lengthErr) return lengthErr;

        if (tempUsers.some(u => u.email === email)) return "emailExists";

        if (!isPasswordValid(password)) return "passwordContentsWrong";

        return null;
    };

    const login = (email: string, password: string) => {
        const foundUser = tempUsers.find(
            u => u.email === email && u.password === password
        );

        if (!foundUser) {
            setLoginError(true);
            return;
        }

        setLoginError(false);
        setUser(foundUser);
        onLoginSuccess();
    };

    const signup = (email: string, userName: string, password: string) => {
        const err = getSignupValidationError(email, userName, password);
        setSignupError(err);

        if (err !== null) return;

        const newUser: UserData = {
            id: createTempId(),
            email,
            userName,
            password
        };

        setTempUsers(prev => [...prev, newUser]);
        setUser(newUser);
        onLoginSuccess();
    };

    const logout = () => {
        setUser(null);
        onLogoutSuccess();
    };

    const deleteUser = (id: number) => {
        setTempUsers(prev => prev.filter(u => u.id !== id));
    };

    const updatePassword = ( newPass: string) => {
        if(user === null) return;
        const newUser = user;
        newUser.password = newPass;
        setTempUsers(prev =>
            prev.map(u => (u.id === newUser.id ? { ...u, password: newPass } : u))
        );
        setUser(newUser);
    };

    const updateUserName = ( newName: string) => {
        if(user === null) return;
        const newUser = user;
        newUser.userName = newName;

        setTempUsers(prev =>
            prev.map(u => (u.id === newUser.id ? { ...u, userName: newName } : u))
        );
        setUser(newUser);
    };

    const openLoginScreen = () => {
        setIsLogin(true);
        setSignupError(null);
    };

    const openSignupScreen = () => {
        setIsLogin(false);
        setLoginError(false);
    };

    const isEmailError = () => isErrorTypeEmail(signupError);
    const isUserError = () => isErrorTypeUser(signupError);
    const isPasswordError = () => isErrorTypePassword(signupError);

    const isUserLoggedIn = () => user !== null;
    return {
        user, tempUsers,

        loginError, signupError, isLogin,

        isEmailError, isUserError, isPasswordError, 
        
        isUserLoggedIn,

        login, signup, logout,

        deleteUser, updatePassword, updateUserName,

        openLoginScreen, openSignupScreen
    } as UserContextResult;
}