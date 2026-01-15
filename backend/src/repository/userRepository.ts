import DB from "../config/db";
import { User } from "../models/users";
import { runUserDelete, runUserInsertSingle, runUserUpdate } from "../utils/repo/userRepoHelpers";

class UserRepository {
    db = DB.getInstance().getConnection();

    getHasEmail(email: string) {
        const stmt = this.db.prepare(`
        SELECT email 
        FROM users
        WHERE email = ?
    `);
        const rows = stmt.all(email) as String[];
        return rows.length > 0;
    }
    getUser(email: string, password: string) {
        const stmt = this.db.prepare(`
        SELECT * 
        FROM users
        WHERE email = ?
        AND password = ?
    `);
        const rows = stmt.all(email, password) as User[];
        return rows[0];
    }

    deleteUser(id: number) { return runUserDelete(this.db, id) }

    addUser(email: string, name: string, password: string) { 
        return runUserInsertSingle(this.db, email, name, password) 
    }

    updateUser(id: number, key: string, value: string) { return runUserUpdate(this.db, id, key, value); }
}

export default UserRepository;