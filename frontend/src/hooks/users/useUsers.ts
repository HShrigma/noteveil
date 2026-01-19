import { useState } from "react";
import { userErrorType, UserContextResult, UserData, UserType } from "../../types/userTypes";
import { createTempId } from "../../utils/mathUtils";
import { getSignupValidationError,  getUserSignupLengthError,  isErrorTypeEmail, isErrorTypePassword, isErrorTypeUser, isPasswordValid, verifyPasswordUpdate} from "./userErrorHelper";
import { addUser, authenticateWithGoogle, deleteUser, deleteUserById, fetchUser, patchUser } from "../../api/userApi";
import { TokenResponse } from "@react-oauth/google";

export function useUsers(onLoginSuccess: () => void, onLogoutSuccess: () => void) {
    const [user, setUser] = useState<UserType>(null);
    const [loginError, setLoginError] = useState(false);
    const [signupError, setSignupError] = useState<userErrorType>(null);
    const [isLogin, setIsLogin] = useState(true);
    const [fromAuth, setFromAuth] = useState(false);

    const useGoogleApi = async (token: TokenResponse) => {
        const res = await authenticateWithGoogle(token);
        if (!res) { console.error("Unexpected Authentication Error"); return; };
        if (res.error) { console.error(`Failed to Authenticate: ${res.error}`); return; };
        const newUser:UserData = {
            id: res.body.id,
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
        setUser({ id: foundUser.id, name: foundUser.name, email: foundUser.email});
        onLoginSuccess();
        setFromAuth(false);
    };

    const signup = async (email: string, name: string, password: string) => {
        const err = await getSignupValidationError(email, name, password);
        setSignupError(err);

        if (err !== null) return;

        const newUser: UserData = { id: createTempId(), email, name: name };
        const res = await addUser(newUser.email, newUser.name, password);
        if(!res.success) { return;}
        const realId = Number(res.body.id);
        newUser.id = realId;

        setSignupError(null);
        setUser(newUser);
        onLoginSuccess();
        setFromAuth(false);
    };
    const removeUserById = async () => {
        if(user === null) return "userNonExistent";
        const res = await deleteUserById(user.id);
        if(!res.success) return "currentPWIncorrect";
        return null;
 
    }
    const removeUser = async (password: string) => {
        if(user === null) return "userNonExistent";
        const res = await deleteUser(user.id, password);
        if(!res.success) return "currentPWIncorrect";
        return null;
    };
    const updateUserName = async (newName: string) => { 
        if(user === null) return "userNonExistent";
        const err = getUserSignupLengthError(newName);
        if(err !== null ) return err;
        const oldName = user.name;
        const newUser = {id: user.id, name: newName, email: user.email};
        setUser(newUser);

        const res = await patchUser(user.id,"name",[newName]);
        if(!res.success){
            newUser.name = oldName;
            setUser(newUser);
            return "userNonExistent";
        }
        return null;
    }
    const updatePassword = async (current: string, confirmCurrent: string, newPass: string, confirmNew: string) => {
        if(user === null) return "userNonExistent";
        const err = verifyPasswordUpdate(current, confirmCurrent, newPass, confirmNew);
        if(err !== null) return err;
        const res = await patchUser(user.id, "password", [current,newPass]);
        if(!res.success) return "currentPWIncorrect";
        return null;
    }

    return {
        user,
        loginError, signupError, isLogin,

        isEmailError: () => isErrorTypeEmail(signupError),
        isUserError: () => isErrorTypeUser(signupError), 
        isPasswordError: () => isErrorTypePassword(signupError), 
        isUserLoggedIn: () => user !== null,

        getUsername: () => user === null ? "User" : user.name,
        login, signup, 
        logout:() => { setUser(null); onLogoutSuccess(); },
        useGoogleApi,

        deleteUser: removeUser, 
        deleteUserById: removeUserById,
        updatePassword,
        updateUserName,
        openLoginScreen: () => { setIsLogin(true); setSignupError(null); setFromAuth(false); },
        openSignupScreen: () => { setIsLogin(false); setLoginError(false); setFromAuth(false); },
        fromAuth
    } as UserContextResult;
}