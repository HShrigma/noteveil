import { runService } from "../utils/service";
import UserRepository from "../repository/userRepository";
import { getUserToUserReturnObj } from "../utils/repo/userRepoHelpers";
import { GoogleUserInfo } from "../models/users";
import { PasswordUtils } from "../utils/security/passwordUtils";

export class UserService {
    repo = new UserRepository();

    async authenticateWithGoogle(payload: GoogleUserInfo) {
        try {
            const googleId = payload.sub;
            const email = payload.email;
            const name = payload.name;

            const exists = this.repo.getHasEmail(email);

            let res = null;
            res = exists ? runService(() => this.repo.getUser(email), 'Error fetching users:') : await this.addUser(email, name);
            if (!res) return null;
            res = { ...res, name: name, email: email };
            return res;
        }
        catch (error) {
            console.error("Error accessing payload", error);
            return null;
        }
    }

    getHasEmail(email: string) {
        return runService(() => this.repo.getHasEmail(email), 'Error verifying email');
    }

    async getUser(email: string, password: string) {
        const user = runService(() => this.repo.getUser(email), 'Error fetching users:');
        if (!user) return null;
        const identifier = "UserService.getUser";
        return await PasswordUtils.getIsMatch(password, user.password, `${identifier}: Found matching user`, `${identifier}: User Not Found`) ? 
            getUserToUserReturnObj(user) : null;
    }

    async deleteUser(id: number, password?: string) {
        const user = runService(() => this.repo.getUserById(id), `Error fetching user. Not found for id = ${id}!`);
        if (!user) {
            console.error(`[ERROR] UserService.deleteUser: User not found!`);
            return null;
        }

        const identifier = "UserService.deleteUser";
        const match = await PasswordUtils.getIsMatch(password, user.password, 
            `${identifier}: Found password`, `${identifier}: Could not find password`);
        const res = match ? runService(() => this.repo.deleteUser(id), 'Error deleting user:') : undefined;

        return res ? { deleted: res.changes > 0, id: id } : null;
    }

    async addUser(email: string, name: string, password?: string) {
        let res;
        if (password) {
            const hashedPW = await PasswordUtils.hash(password);
            res = runService(() => this.repo.addUser(email, name, hashedPW), 'Error adding user:');
        }
        else {
            res = runService(() => this.repo.addUser(email, name), 'Error adding user:');
        }
        return res ? { id: res.lastInsertRowid as number } : null;
    }

    async updateUser(id: number, key: string, values: string[]) {
        let value: string | null = "";
        switch (key) {
            case "name":
                value = values[0];
                break;
            case "password":
                const currentPW = values[0];
                const newPW = values[1];
                const user = runService(() => this.repo.getUserById(id), `Error fetching user. Not found for id = ${id}!`);
                if (!user) {
                    console.error(`[ERROR] UserService.updateUser: User not found!`);
                    return null;
                }
                const identifier = "UserService.updateUser";
                value = await PasswordUtils.getIsMatch(currentPW, user.password, `${identifier}: Found Matching User`, `${identifier}: User Not Found`) ? await PasswordUtils.hash(newPW) : null;
                break;
            default:
                console.error(`[ERROR] UserService.updateUser: Invalid Key: ${key}!`);
                return null;
        }
        if (value === null) return null;
        const res = runService(() => this.repo.updateUser(id, key, value),
            'Error updating user:');
        return res ? { updated: res.changes > 0, id: id, [key]: values } : null;
    }
}

export default new UserService();