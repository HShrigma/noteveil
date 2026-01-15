import DB from "../config/db";
import { User } from "../models/users";
import { runUserDelete, runUserInsertSingle, runUserTitleUpdate } from "../utils/repo/userRepoHelpers";

class UserRepository {
    db = DB.getInstance().getConnection();

    getUser(id: number) {
        const stmt = this.db.prepare(`
        SELECT * 
        FROM users
        WHERE id = ?
    `);
        const rows = stmt.all(id) as User[];
        return rows;
    }

    deleteUser(id: number) { return runUserDelete(this.db, id) }

    addUser(email: string, userName: string, password: string) { 
        return runUserInsertSingle(this.db, email, userName, password) 
    }

    updateUser(id: number, key: string, value: string) { return runUserTitleUpdate(this.db, id, key, value); }
}

export default UserRepository;