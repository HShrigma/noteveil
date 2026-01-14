import { useState } from "react";
import { userErrorType, UserContextResult, UserData, UserType } from "../../types/userTypes";
import { createTempId } from "../../utils/mathUtils";
import { getPasswordValidationError, getSignupValidationError,  getUserSignupLengthError,  isErrorTypeEmail, isErrorTypePassword, isErrorTypeUser} from "./userErrorHelper";

const sampleUser: UserData = { id: 1, userName: "testUser", email: "sample@mail.com", password: "123!@#ABCabc" };

export function useUsers(onLoginSuccess: () => void, onLogoutSuccess: () => void) {
    const [user, setUser] = useState<UserType>(null);
    const [tempUsers, setTempUsers] = useState<UserData[]>([sampleUser]);
    const [loginError, setLoginError] = useState(false);
    const [signupError, setSignupError] = useState<userErrorType>(null);
    const [isLogin, setIsLogin] = useState(true);

    const login = (email: string, password: string) => {
        const foundUser = tempUsers.find(u => u.email === email && u.password === password);
        if (!foundUser) { setLoginError(true); return; }

        setLoginError(false);
        setUser(foundUser);
        onLoginSuccess();
    };

    const signup = async (email: string, userName: string, password: string) => {
        const err = await getSignupValidationError(email, userName, password, tempUsers);
        setSignupError(err);

        if (err !== null) return;

        const newUser: UserData = { id: createTempId(), email, userName, password };
        setTempUsers(prev => [...prev, newUser]);
        setUser(newUser);
        onLoginSuccess();
    };

    const deleteUser = () => {
        if(user === null) return;
        setTempUsers(prev => prev.filter(u => u.id !== user.id));
    };

    const updateUserField = async <K extends keyof UserData>( key: K,  value: UserData[K], validate?: () => userErrorType): Promise<userErrorType> => {
        if(user === null) return "userNonExistent";
        const err = validate?.();
        if(err) return err;

        setTempUsers(prev => prev.map(u => u.id === user.id? {...u, [key]:value} : u));
        setUser(prev => prev === null ? null : {...prev,[key]:value });
        return null;
    }

    return {
        user, tempUsers,
        loginError, signupError, isLogin,

        isEmailError: () => isErrorTypeEmail(signupError),
        isUserError: () => isErrorTypeUser(signupError), 
        isPasswordError: () => isErrorTypePassword(signupError), 
        isUserLoggedIn: () => user !== null,

        getUserName: () => user === null ? "User" : user.userName,
        login, signup, 
        logout:() => { setUser(null); onLogoutSuccess(); },

        deleteUser, 
        updatePassword:(newPass: string) => updateUserField("password", newPass, () => getPasswordValidationError(newPass)),
        updateUserName:(newName: string) => updateUserField("userName", newName, () => getUserSignupLengthError(newName)),

        openLoginScreen: () => { setIsLogin(true); setSignupError(null); },
        openSignupScreen: () => { setIsLogin(false); setLoginError(false); }
    } as UserContextResult;
}