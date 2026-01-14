import { useState } from "react";
import { userErrorType, UserContextResult, UserData, UserType } from "../../types/userTypes";
import { createTempId } from "../../utils/mathUtils";
import { getPasswordSignupLengthError, getPasswordValidationError, getSignupLengthError,  getUserSignupLengthError,  isErrorTypeEmail, isErrorTypePassword, isErrorTypeUser, isPasswordValid } from "./userErrorHelper";

const sampleUser: UserData = {
    id: 1,
    userName: "testUser",
    email: "sample@mail.com",
    password: "123!@#ABCabc"
};

export function useUsers(onLoginSuccess: () => void, onLogoutSuccess: () => void) {
    const [user, setUser] = useState<UserType>(null);
    const [tempUsers, setTempUsers] = useState<UserData[]>([sampleUser]);

    const [loginError, setLoginError] = useState(false);
    const [signupError, setSignupError] = useState<userErrorType>(null);
    const [isLogin, setIsLogin] = useState(true);

    const getSignupValidationError = ( email: string, userName: string, password: string): userErrorType => {
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

    const deleteUser = () => {
        if(user === null) return;
        setTempUsers(prev => prev.filter(u => u.id !== user.id));
    };

    const updatePassword = async ( newPass: string) => {
        if(user === null) return "userNonExistent";
        const passError = getPasswordValidationError(newPass);
        if(passError !== null) return passError;

        const newUser = user;
        newUser.password = newPass;
        setTempUsers(prev =>
            prev.map(u => (u.id === newUser.id ? { ...u, password: newPass } : u))
        );
        setUser(newUser);

        return null;
    };

    const updateUserName = async (newName: string) => {
        if(user === null) return "userNonExistent";

        const userError = getUserSignupLengthError(newName);
        if(userError !== null) return userError;

        const newUser = user;
        newUser.userName = newName;

        setTempUsers(prev =>
            prev.map(u => (u.id === newUser.id ? { ...u, userName: newName } : u))
        );
        setUser(newUser);
        return null;
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
    const getUserName = () => user  === null ? "User" : user.userName;

    const isUserLoggedIn = () => user !== null;
    return {
        user, tempUsers,

        loginError, signupError, isLogin,

        isEmailError, isUserError, isPasswordError, 
        
        isUserLoggedIn, getUserName,

        login, signup, logout,

        deleteUser, updatePassword, updateUserName,

        openLoginScreen, openSignupScreen
    } as UserContextResult;
}