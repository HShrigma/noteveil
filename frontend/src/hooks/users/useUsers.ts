import { useState } from "react";
import type { userErrorType, UserContextResult, UserData, UserType } from "../../types/userTypes";
import { getSignupValidationError, getUserSignupLengthError, isErrorTypeEmail, isErrorTypePassword, isErrorTypeUser, verifyPasswordUpdate } from "./userErrorHelper";
import { registerUser, authenticateWithGoogle, deleteUser, deleteUserById, fetchUser, patchUser, refreshUser, logoutAndClearToken } from "../../api/userApi";
import type { TokenResponse } from "@react-oauth/google";

export function useUsers(onLoginSuccess: () => void, onLogoutSuccess: () => void) {
    const [user, setUser] = useState<UserType>(null);
    const [loginError, setLoginError] = useState(false);
    const [signupError, setSignupError] = useState<userErrorType>(null);
    const [isLogin, setIsLogin] = useState(true);
    const [fromAuth, setFromAuth] = useState(false);
    const [authLogoutNotice, setAuthLogoutNotice] = useState(false);
    const [initializing, setInitializing] = useState(true);

    const showAuthLogoutNotice = (seconds: number) => {
        setAuthLogoutNotice(true);
        setTimeout(() => setAuthLogoutNotice(false), seconds * 1000);
    }


    const initializeUser = async () => {
        try {
            const res = await refreshUser();

            if (res !== null) {
                setUser({
                    name: res.name,
                    email: res.email,
                });
                setFromAuth(res.from_auth);
                onLoginSuccess();
            }
        } finally {
            setInitializing(false);
        }
    };

    const useGoogleApi = async (token: TokenResponse) => {
        const res = await authenticateWithGoogle(token);
        if (!res) { console.error("Unexpected Authentication Error"); return; };
        if (res.error) { console.error(`Failed to Authenticate: ${res.error}`); return; };
        const newUser: UserData = {
            name: res.body.name,
            email: res.body.email
        }
        setFromAuth(true);
        setUser(newUser);
        onLoginSuccess();
        setLoginError(false);
        setSignupError(null);
    }

    const login = async (email: string, password: string) => {
        const foundUser = await fetchUser(email, password);
        if (!foundUser || foundUser.error) {
            setLoginError(true);
            return;
        }
        setLoginError(false);
        setUser({ name: foundUser.name, email: foundUser.email });
        setFromAuth(false);
        onLoginSuccess();
    };

    const signup = async (email: string, name: string, password: string) => {
        const err = await getSignupValidationError(email, name, password);
        setSignupError(err);
        if (err !== null) return;

        const newUser: UserData = { email, name: name };
        const res = await registerUser(newUser.email, newUser.name, password);
        if (!res || res.error) return;

        setSignupError(null);
        setUser(newUser);
        onLoginSuccess();
        setFromAuth(false);
    };
    const removeUserById = async () => {
        if (user === null) return "userNonExistent";
        const res = await deleteUserById();
        if (res.error) return "errorDeletingById";
        return null;
    }
    const removeUser = async (password: string) => {
        if (user === null) return "userNonExistent";
        const res = await deleteUser(password);
        if (res.success === false) return "currentPWIncorrect";
        return null;
    };
    const updateUserName = async (newName: string) => {
        if (user === null) return "userNonExistent";
        const err = getUserSignupLengthError(newName);
        if (err !== null) return err;
        const oldName = user.name;
        const newUser = { name: newName, email: user.email };
        setUser(newUser);

        const res = await patchUser("name", [newName]);
        if (!res.success) {
            newUser.name = oldName;
            setUser(newUser);
            return "userNonExistent";
        }
        return null;
    }
    const updatePassword = async (current: string, confirmCurrent: string, newPass: string, confirmNew: string) => {
        if (user === null) return "userNonExistent";
        const err = verifyPasswordUpdate(current, confirmCurrent, newPass, confirmNew);
        if (err !== null) return err;
        const res = await patchUser("password", [current, newPass]);
        if (res.error) return "currentPWIncorrect";
        return null;
    }
    const logout = async () => {
        await logoutAndClearToken();
        setUser(null);
        setIsLogin(true);
        onLogoutSuccess();
    }
    const authLogout = async () => {
        await logout();
        showAuthLogoutNotice(5);
    }
    return {
        user,
        initializing,
        loginError, signupError, isLogin,

        isEmailError: () => isErrorTypeEmail(signupError),
        isUserError: () => isErrorTypeUser(signupError),
        isPasswordError: () => isErrorTypePassword(signupError),
        isUserLoggedIn: () => user !== null,

        initializeUser,
        getUsername: () => user === null ? "User" : user.name,
        login, signup,
        logout,
        authLogout,
        useGoogleApi,

        deleteUser: removeUser,
        deleteUserById: removeUserById,
        updatePassword,
        updateUserName,
        openLoginScreen: () => { setIsLogin(true); setSignupError(null); setFromAuth(false); },
        openSignupScreen: () => { setIsLogin(false); setLoginError(false); setFromAuth(false); },
        fromAuth,
        authLogoutNotice
    } as UserContextResult;
}