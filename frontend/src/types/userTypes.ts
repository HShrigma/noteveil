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

const getLengthHint = (isPassword: boolean) => {
    const min = isPassword ? signupValidationParams.minPassword : signupValidationParams.minUser;
    const max = isPassword ? signupValidationParams.maxPassword : signupValidationParams.maxUser;
    return `Must be between ${min} and ${max} characters long.`;
}
const getLengthError = (isPassword: boolean, isLong: boolean) => {
    return `${isPassword ? "Password" : "Username"} is too ${isLong ? "long" : "short"}. ${getLengthHint(isPassword)}`;
}
const getPasswordContainsHint = () => {
    const { upper, lower, number, symbol } = signupValidationParams.passwordRequires;
    const minMsg = (charType:string) => `at least one ${charType}`;
    const upperMsg = upper ? minMsg("upper case character") : "";
    const lowerMsg = lower ? minMsg("lower case character") : "";
    const numberMsg = number ? minMsg("number") : "";
    const symbolMsg = symbol ? minMsg("symbol (e.g. @,!,?)") : "";
    const msgs = [upperMsg, lowerMsg, numberMsg, symbolMsg].filter(msg => msg !== "");

    if(msgs.length === 0) return "";
    if(msgs.length === 1) return  `Must contain ${msgs[0]}`;
    if(msgs.length === 2) return  `Must contain ${msgs[0]} and ${msgs[1]}`;

    let res = "Must contain ";

    for (let i = 0; i < msgs.length; i++) {
        if (i === msgs.length - 1) {
            res += msgs[i];
            continue;
        }
        if( i === msgs.length - 2) {
            res += `${msgs[i]}, and `;
            continue;
        }
        res+= `${msgs[i]}, `;
    }
    return res;
}

export const getErrorMessageForSignUp = (err: signUpErrorType) => {
    switch (err) {
        case "emailExists": return "This email already exists on Noteveil. Please provide a valid email.";
        case "emailFalse": return "This email does not exist. Please provide a valid email.";
        case "passwordContentsWrong": return `Invalid password. ${getPasswordContainsHint()}. ${getLengthHint(true)}`;
        case "passwordTooLong": return getLengthError(true, true);
        case "passwordTooShort": return getLengthError(true, false);
        case "userTooLong": return getLengthError(false, true);
        case "userTooShort": return getLengthError(false, false);
        default: return ""
    }
}
export type UserType = UserData | null;