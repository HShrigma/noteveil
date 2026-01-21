import { User } from "../../models/users";
import UserRepository from "../../repository/userRepository";
import { getUserToUserReturnObj } from "../repo/userRepoHelpers";
import { runService } from "../service";
import { PasswordUtils } from "./passwordUtils";

const mismatchErr = (identifier: string) => `[ERROR] ${identifier}: Password mismatch`;
const credentialsErr = (identifier: string) => `[ERROR] ${identifier}: Invalid credentials`;

export const tryRunPasswordVerifiedOperation = async <T>(
    userOperation: () => User | null,
    identifier: string,
    plainText: string | undefined,
    verifiedOperation: () => T | Promise<T>
): Promise<T | null> => {
    const user = userOperation();
    if (!user) {
        console.error(credentialsErr(identifier));
        return null;
    }
    const isMatch = await PasswordUtils.getIsMatch(
        plainText,
        user.password,
        mismatchErr(identifier)
    );

    if (!isMatch) return null;

    return await verifiedOperation();
}

export const getNewPasswordIfVerified = async (identifier: string, currentPW: string, newPW: string, id: number, repo: UserRepository) => {
    return await tryRunPasswordVerifiedOperation(
        () => runService(() => repo.getUserById(id), credentialsErr(identifier)),
        identifier,
        currentPW,
        () => PasswordUtils.hash(newPW)
    );

}

export const deleteAccountIfVerified = async (identifier: string, password: string | undefined, id: number, repo: UserRepository) => {
    return await tryRunPasswordVerifiedOperation(
        () => runService(() => repo.getUserById(id), credentialsErr(identifier)),
        identifier,
        password,
        () => runService(() => repo.deleteUser(id), credentialsErr(identifier))
    );

}

export const addUserWithCredentials = async (identifier: string, email: string, name: string, password: string | undefined, repo: UserRepository) => {
    const err = `[ERROR] ${identifier}: Could not add user`;
    if (!password) return runService(() => repo.addUser(email, name), err);

    const hashedPW = await PasswordUtils.hash(password);
    return runService(() => repo.addUser(email, name, hashedPW), err);

}

export const getUserIfPasswordMatches = async (identifier: string, password: string | undefined, user: User) => {
    return await PasswordUtils.getIsMatch(password, user.password, mismatchErr(identifier)) ? user : null;
}

export const getUserReturnObjIfPasswordMatches = async (identifier: string, password: string | undefined, user: User) => {
    return await PasswordUtils.getIsMatch(password, user.password, mismatchErr(identifier)) ? getUserToUserReturnObj(user) : null;
}

export const getUserUpdateValueForKey = async (id: number, key: string, values: string[], identifier: string, repo: UserRepository) => {
    switch (key) {
        case "name":
            return values[0];
        case "password":
            const currentPW = values[0];
            const newPW = values[1];
            if (!currentPW || !newPW) {
                console.error(credentialsErr(identifier));
                return null;
            }
            return await getNewPasswordIfVerified(identifier, currentPW, newPW, id, repo);
        default:
            console.error(credentialsErr(identifier));
            return null;
    }
}