import { runService } from "../utils/service";
import UserRepository from "../repository/userRepository";
import { GoogleUserInfo, UserJWTPayload, UserReturnObj } from "../models/users";
import { addUserWithCredentials, deleteAccountIfVerified, getUserReturnObjIfPasswordMatches, getUserUpdateValueForKey } from "../utils/security/userAuthHelpers";
import { signToken, verifyToken } from "../utils/security/jwtHelper";

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

    async getUserJWTRefreshResult(currentToken: string) {
        const payload = verifyToken(currentToken) as UserJWTPayload;
        const user = await this.getUserById(payload.id);
        if (!user) {
            return null;
        }
        return { token: signToken({ id: user.id }), user: user };
    }

    async getUserById(id: number){
        const user = runService(() => this.repo.getUserById(id), 'Error fetching users:');
        if(!user) return null;
        return { id: user.id, email: user.email, name: user.name } as UserReturnObj;
    }

    async getUser(email: string, password: string) {
        const user = runService(() => this.repo.getUser(email), 'Error fetching users:');
        if (!user) return null;
        return await getUserReturnObjIfPasswordMatches("UserService.getUser", password, user);
    }

    async deleteUser(id: number, password?: string) {
        const res = await deleteAccountIfVerified("UserService.deleteUser", password, id, this.repo); 
        return res ? { deleted: res.changes > 0, id: id } : null;
    }

    async addUser(email: string, name: string, password?: string) {
        const res = await addUserWithCredentials("UserService.addUser", email, name, password, this.repo);
        return res ? { id: Number(res.lastInsertRowid) } : null;
    }

    async updateUser(id: number, key: string, values: string[]) {
        const identifier = "UserService.updateUser";
        const value = await getUserUpdateValueForKey(id, key, values, identifier, this.repo);
        if (value === null) return null;

        const res = runService(() => this.repo.updateUser(id, key, value),
            `[ERROR] ${identifier}: Could not update user`);
        return res ? { updated: res.changes > 0, id: id, [key]: values } : null;
    }
}

export default new UserService();