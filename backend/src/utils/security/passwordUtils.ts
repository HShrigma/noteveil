import brcypt from "bcrypt";
import { SALT_ROUNDS } from "../..";


export class PasswordUtils {
    static async hash(password: string): Promise<string> {
        return brcypt.hash(password, SALT_ROUNDS);
    }

    static async compare(plainText: string, hashed: string): Promise<boolean> {
        return brcypt.compare(plainText, hashed);
    }

    static async getIsMatch(
        plainText: string|undefined, hashed: string,
        successMsg: string, errMsg: string
    ): Promise<boolean> {
        if (!plainText) return false;
        const match = await PasswordUtils.compare(plainText, hashed);
        if (!match) {
            console.error(`[ERROR] ${errMsg}`);
            return false;
        }
        console.log(`[INFO] ${successMsg}`);
        return true;
    }
}

