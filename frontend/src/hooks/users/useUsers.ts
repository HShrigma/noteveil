import { useEffect, useState } from "react";
import { userErrorType, UserContextResult, UserData, UserType } from "../../types/userTypes";
import { createTempId } from "../../utils/mathUtils";
import { getPasswordValidationError, getSignupValidationError,  getUserSignupLengthError,  isErrorTypeEmail, isErrorTypePassword, isErrorTypeUser} from "./userErrorHelper";
import { addUser, deleteUser, fetchUser, patchUser } from "../../api/userApi";

export function useUsers(onLoginSuccess: () => void, onLogoutSuccess: () => void) {
    const [user, setUser] = useState<UserType>(null);
    const [loginError, setLoginError] = useState(false);
    const [signupError, setSignupError] = useState<userErrorType>(null);
    const [isLogin, setIsLogin] = useState(true);

    const login = async (email: string, password: string) => {
        const foundUser = await fetchUser(email, password);
        if (!foundUser) { setLoginError(true); return; }

        setLoginError(false);
        setUser({ id: foundUser.id, name: foundUser.name, email: foundUser.email, password: foundUser.password });
        onLoginSuccess();
    };

    const signup = async (email: string, name: string, password: string) => {
        const err = await getSignupValidationError(email, name, password);
        setSignupError(err);

        if (err !== null) return;

        const newUser: UserData = { id: createTempId(), email, name: name, password };
        const res = await addUser(newUser.email, newUser.name, newUser.password);
        console.log(res);
        if(!res.success) {
            console.log(" no success " + res.body.success);
            return;
        }
        console.log("res is OK");
        const realId = Number(res.body.id);
        newUser.id = realId;
        console.log(`New User: ${newUser}`);
        setUser(newUser);
        onLoginSuccess();
    };

    const removeUser = async () => {
        if(user === null) return;
        await deleteUser(user.id);
    };

    const updateUserField = async <K extends keyof UserData>( key: K,  value: UserData[K], validate?: () => userErrorType): Promise<userErrorType> => {
        if(user === null) return "userNonExistent";
        const err = validate?.();
        if(err) return err;

        setUser(prev => prev === null ? null : {...prev,[key]:value });
        await patchUser(user.id, key, String(value));
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

        deleteUser: removeUser, 
        updatePassword:(newPass: string) => updateUserField("password", newPass, () => getPasswordValidationError(newPass)),
        updateUserName:(newName: string) => updateUserField("name", newName, () => getUserSignupLengthError(newName)),

        openLoginScreen: () => { setIsLogin(true); setSignupError(null); },
        openSignupScreen: () => { setIsLogin(false); setLoginError(false); }
    } as UserContextResult;
}