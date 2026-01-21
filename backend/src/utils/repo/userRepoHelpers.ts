import { Database } from "better-sqlite3";
import { tableType } from "../../config/schema";
import { runDelete, runInsertSingle, runUpdate } from "./repository";
import { runProjectDelete } from "./projectRepoHelpers";
import { User, UserReturnObj } from "../../models/users";

const usersTable = tableType.users;

export const runUserUpdate = (db: Database, id: number, key: string, value: string) => {
    const obj = {
        db: db,
        tableName: usersTable,
        fieldNames: [key],
        fieldValues: [value],
        predicateNames: ["id"],
        predicateValues: [id]
    }
    return runUpdate(obj);
}

export const runUserDelete = (db: Database, id: number) => {
    const obj = {
        db: db,
        tableName: usersTable,
        predicateNames: ["id"],
        predicateValues: [id]
    }
    runProjectDelete(db, id, ["user_id"]);
    return runDelete(obj);
}

export const runUserInsertSingle = (db: Database, email: string, name: string, password?: string) => {
    const obj = {
        db: db,
        tableName: usersTable,
        fieldNames: ["email", "name", "from_auth"],
        fieldValues: [email, name, 1]
    }
    if(password){
        obj.fieldNames[2] = "password";
        obj.fieldValues[2] = password;
    }

    return runInsertSingle(obj)
}

export const getUserToUserReturnObj = (user: User, fromAuth: boolean): UserReturnObj => {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        from_auth: fromAuth
    }
}