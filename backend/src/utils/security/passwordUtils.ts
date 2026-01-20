import brcypt from "bcrypt";
import { SALT_ROUNDS } from "../..";


export class PasswordUtils {
    static async hash(password:string): Promise<string>{
        return brcypt.hash(password, SALT_ROUNDS);
    }

    static async compare(plainText: string, hashed: string): Promise<boolean>{
        return brcypt.compare(plainText,hashed);
    }
}

