import { fetchIfEmailExists } from "../../api/userApi";
import { userErrorType, signupValidationParams, UserData } from "../../types/userTypes";

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
    const minMsg = (charType: string) => `at least one ${charType}`;
    const upperMsg = upper ? minMsg("upper case character") : "";
    const lowerMsg = lower ? minMsg("lower case character") : "";
    const numberMsg = number ? minMsg("number") : "";
    const symbolMsg = symbol ? minMsg("symbol (e.g. @,!,?)") : "";
    const msgs = [upperMsg, lowerMsg, numberMsg, symbolMsg].filter(msg => msg !== "");

    if (msgs.length === 0) return "";
    if (msgs.length === 1) return `Must contain ${msgs[0]}`;
    if (msgs.length === 2) return `Must contain ${msgs[0]} and ${msgs[1]}`;

    let res = "Must contain ";

    for (let i = 0; i < msgs.length; i++) {
        if (i === msgs.length - 1) {
            res += msgs[i];
            continue;
        }
        if (i === msgs.length - 2) {
            res += `${msgs[i]}, and `;
            continue;
        }
        res += `${msgs[i]}, `;
    }
    return res;
}

export const getUserSignupLengthError = (username: string) => {
    if (username.length < signupValidationParams.minUser) return "userTooShort";
    if (username.length > signupValidationParams.maxUser) return "userTooLong";
    return null;
}

export const getPasswordSignupLengthError = (password: string) => {
    if (password.length < signupValidationParams.minPassword) return "passwordTooShort";
    if (password.length > signupValidationParams.maxPassword) return "passwordTooLong";
    return null;
}

export const getSignupLengthError = (username: string, password: string) => {
    const userError = getUserSignupLengthError(username);
    if (userError !== null) return userError;

    const passError = getPasswordValidationError(password);
    if (passError !== null) return passError;

    return null;
};

export const getPasswordValidationError = (password: string) => {
    const lengthErr = getPasswordSignupLengthError(password);
    if (lengthErr !== null) return lengthErr;
    if (!isPasswordValid(password)) return "passwordContentsWrong";
    return null;
}

export const isPasswordValid = (password: string) => {
    const { upper, lower, number, symbol } = signupValidationParams.passwordRequires;

    if (upper && !/[A-Z]/.test(password)) return false;
    if (lower && !/[a-z]/.test(password)) return false;
    if (number && !/[0-9]/.test(password)) return false;
    if (symbol && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;

    return true;
};

export const getErrorMessageForSignUp = (err: userErrorType) => {
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

export const getSignupValidationError = async (email: string, userName: string, password: string): Promise<userErrorType> => {
    const lengthErr = getSignupLengthError(userName, password);
    if (lengthErr) return lengthErr;
    const hasEmail= await fetchIfEmailExists(email);
    if (hasEmail.exists) return "emailExists";
    if (!isPasswordValid(password)) return "passwordContentsWrong";
    return null;
};
export const isErrorTypeEmail = (err: userErrorType) =>
    err === "emailExists" || err === "emailFalse";

export const isErrorTypeUser = (err: userErrorType) =>
    err === "userTooShort" ||
    err === "userTooLong";

export const isErrorTypePassword = (err: userErrorType) =>
    err === "passwordTooShort" ||
    err === "passwordTooLong" ||
    err === "passwordContentsWrong";
