import { runService } from "../utils/service";
import UserRepository from "../repository/userRepository";
import bcrypt from "bcrypt";
const SALT_ROUNDS = 10;

export class UserService {
    repo = new UserRepository();

    getHasEmail(email: string) {
        return runService(() => this.repo.getHasEmail(email), 'Error verifying email');
    }

    async getUser(email: string, password: string) {
        const user = runService(() => this.repo.getUser(email), 'Error fetching users:');
        if (!user) return null;
        const match = await bcrypt.compare(password, user.password);
        if (!match) return null;
        return user;
    }

    async deleteUser(id: number, password: string) {

        const user = runService(() => this.repo.getUserById(id), `Error fetching user. Not found for id = ${id}!`);
        if (!user) {
            console.error(`[ERROR] UserService.deleteUser: User not found!`);
            return null;
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            console.error(`[ERROR] UserService.deleteUserr: Current password incorrect`);
            return null;
        } 
        console.log("[INFO] UserService.deleteUserr: User matches ");
        const res = runService(() => this.repo.deleteUser(id), 'Error deleting user:');
        return res ? { deleted: res.changes > 0, id: id } : null;
    }

    async addUser(email: string, name: string, password: string) {
        const hashedPW = await bcrypt.hash(password, SALT_ROUNDS);
        const res = runService(() => this.repo.addUser(email, name, hashedPW), 'Error adding user:');
        return res ? { id: res.lastInsertRowid as number } : null;
    }

    async updateUser(id: number, key: string, values: string[]) {
        let value = "";
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
                const match = await bcrypt.compare(currentPW, user.password);
                if (!match) {
                    console.error(`[ERROR] UserService.updateUser: Current password incorrect`);
                    return null;
                }
                value = await bcrypt.hash(newPW, SALT_ROUNDS);
                break;
            default:
                console.error(`[ERROR] UserService.updateUser: Invalid Key: ${key}!`);
                return null;
        }
        const res = runService(() => this.repo.updateUser(id, key, value),
            'Error updating user:');
        return res ? { updated: res.changes > 0, id: id, [key]: values } : null;
    }
}

export default new UserService();