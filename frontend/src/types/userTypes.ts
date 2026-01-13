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
};

export type signUpErrorType =  "userViolation" | "passwordViolation" | null
export type UserType = UserData | null;