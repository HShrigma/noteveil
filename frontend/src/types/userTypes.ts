import type { TokenResponse } from "@react-oauth/google";

export interface UserData{
    name: string;
    email: string; 
}

export const signupValidationParams = {
    minUser: 8,
    maxUser: 20,
    minPassword: 8,
    maxPassword: 32,
    passwordRequires: { upper: true, lower: true, number: true, symbol: true }
};

export type userErrorType =
    null
    | "userTooLong"
    | "passwordTooShort" 
    | "passwordTooLong" 
    | "passwordContentsWrong"
    | "emailExists"
    | "emailFalse"
    | "userTooShort"
    | "userNonExistent"
    | "currentPWIncorrect"
    | "currentPWNotConfirmed"
    | "newPWEmpty"
    | "newPWNotConfirmed"
    | "errorDeletingById";

export type UserType = UserData | null;

export type UserContextResult = {
    user: UserType,
    initializing: boolean,
    loginError: boolean,
    signupError: userErrorType,
    isLogin: boolean,

    initializeUser: () => Promise<void>;
    getUsername: () => string;
    isEmailError: () => boolean,
    isUserError: () => boolean,
    isPasswordError: () => boolean,

    isUserLoggedIn: () => boolean;
    login: (email: string, password: string) => void,
    signup: (email: string, userName: string, password: string) => void,
    logout: () => Promise<void>,
    authLogout: () => Promise<void>;

    deleteUserById: () => Promise<"userNonExistent" | "errorDeletingById" | null>,
    deleteUser: (password:string) => void,
    updatePassword: (
        current: string, 
        confirmCurrent: string,
        newPass: string,
        confirmNew: string
    ) => Promise<userErrorType>,

    updateUserName:(newName: string) => Promise<userErrorType>,

    openLoginScreen: () => void,
    openSignupScreen: () => void,
    useGoogleApi: (token: TokenResponse) => Promise<void>,
    fromAuth: boolean,
    authLogoutNotice: boolean,
}