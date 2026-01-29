import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../..";

export class PasswordUtils {
    static async hash(password: string): Promise<string> {
        const hashed = await bcrypt.hash(password, SALT_ROUNDS);
        return hashed;
    }

    static async compare(plainText: string, hashed: string): Promise<boolean> {
        const match = await bcrypt.compare(plainText, hashed);
        return match;
    }

    static async getIsMatch(
        plainText: string|undefined, 
        hashed: string,
        errMsg: string
    ): Promise<boolean> {
        if (!plainText) {
            console.error('PasswordUtils.getIsMatch - plainText is undefined or empty');
            return false;
        }
        
        const match = await PasswordUtils.compare(plainText, hashed);
        if (!match) {
            console.error(errMsg);
            console.error('PasswordUtils.getIsMatch - Mismatch details:');
            console.error('  plainText char codes:', Array.from(plainText).map(c => `${c}:${c.charCodeAt(0)}`));
            console.error('  hashed length:', hashed.length);
        } else {
        }
        return match;
    }
}
