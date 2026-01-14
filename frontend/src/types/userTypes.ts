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

export type signUpErrorType =
    "userTooShort"
    | "userTooLong"
    | "passwordTooShort" 
    | "passwordTooLong" 
    | "passwordContentsWrong"
    | "emailExists"
    | "emailFalse"
    | null;

export type UserType = UserData | null;

export type UserContextResult = {
    user: UserType,
    tempUsers: UserData[],

    loginError: boolean,
    signupError: signUpErrorType,
    isLogin: boolean,

    isEmailError: () => boolean,
    isUserError: () => boolean,
    isPasswordError: () => boolean,

    login: (email: string, password: string) => void,
    signup: (email: string, userName: string, password: string) => void,
    logout: () => void,

    deleteUser: (id: number) => void,
    updatePassword: (id: number, newPass: string) => void,
    updateUserName:(id: number, newName: string) => void,

    openLoginScreen: () => void,
    openSignupScreen: () => void
}