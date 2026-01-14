export interface UserData{
    id: number;
    userName: string;
    email: string; 
    password: string;
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
    | "userNonExistent";

export type UserType = UserData | null;

export type UserContextResult = {
    user: UserType,
    tempUsers: UserData[],

    loginError: boolean,
    signupError: userErrorType,
    isLogin: boolean,

    getUserName: () => string;
    isEmailError: () => boolean,
    isUserError: () => boolean,
    isPasswordError: () => boolean,

    isUserLoggedIn: () => boolean;

    login: (email: string, password: string) => void,
    signup: (email: string, userName: string, password: string) => void,
    logout: () => void,

    deleteUser: () => void,
    updatePassword: (newPass: string) => Promise<userErrorType>,
    updateUserName:(newName: string) => Promise<userErrorType>,

    openLoginScreen: () => void,
    openSignupScreen: () => void
}