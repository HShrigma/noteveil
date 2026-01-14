import { useState } from "react";
import {
    signUpErrorType,
    signupValidationParams,
    UserData,
    UserType
} from "../../types/userTypes";
import { createTempId } from "../../utils/mathUtils";

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

    const getSignupLengthError = (userName: string, password: string) => {
        if (userName.length < signupValidationParams.minUser) return "userTooShort";
        if (userName.length > signupValidationParams.maxUser) return "userTooLong";

        if (password.length < signupValidationParams.minPassword) return "passwordTooShort";
        if (password.length > signupValidationParams.maxPassword) return "passwordTooLong";

        return null;
    };

    const isPasswordValid = (password: string) => {
        const { upper, lower, number, symbol } = signupValidationParams.passwordRequires;

        if (upper && !/[A-Z]/.test(password)) return false;
        if (lower && !/[a-z]/.test(password)) return false;
        if (number && !/[0-9]/.test(password)) return false;
        if (symbol && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;

        return true;
    };

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

    const updatePassword = (id: number, newPass: string) => {
        setTempUsers(prev =>
            prev.map(u => (u.id === id ? { ...u, password: newPass } : u))
        );
        setUser(prev =>
            prev && prev.id === id
                ? { ...prev, password: newPass }
                : prev);
    };

    const updateUserName = (id: number, newName: string) => {
        console.log(`id: ${id}, newName: ${newName}`);
        setTempUsers(prev =>
            prev.map(u => (u.id === id ? { ...u, userName: newName } : u))
        );
        setUser(prev =>
            prev && prev.id === id
                ? { ...prev, userName: newName }
                : prev);
    };

    const openLoginScreen = () => {
        setIsLogin(true);
        setSignupError(null);
    };

    const openSignupScreen = () => {
        setIsLogin(false);
        setLoginError(false);
    };

    return {
        user,
        tempUsers,

        loginError,
        signupError,
        isLogin,

        login,
        signup,
        logout,

        deleteUser,
        updatePassword,
        updateUserName,

        openLoginScreen,
        openSignupScreen
    };
}
