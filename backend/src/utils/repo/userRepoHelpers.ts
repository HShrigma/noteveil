import { Database } from "better-sqlite3";
import { tableType } from "../../config/schema";
import { runDelete, runInsertSingle, runUpdate } from "./repository";

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
    return runDelete(obj);
}

export const runUserInsertSingle = (db: Database, email: string, name: string, password: string) => {
    const obj = {
        db:db,
        tableName: usersTable,
        fieldNames: ["email","name","password"],
        fieldValues: [email, name, password]
    }
    return runInsertSingle(obj)
}