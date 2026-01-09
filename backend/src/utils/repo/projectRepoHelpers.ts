import { Database } from "better-sqlite3";
import { tableType } from "../../config/schema";
import { runDelete, runInsertSingle, runUpdate } from "./repository";

const projectsTable = tableType.projects;

export const runProjectTitleUpdate = (db: Database, title: string, id: number) => {
    const obj = {
        db: db,
        tableName: projectsTable, 
        fieldNames: ["title"],
        fieldValues: [title],
        predicateNames: ["id"],
        predicateValues: [id]
    }
    return runUpdate(obj);
}

export const runProjectDelete = (db: Database, id: number) => {
    const obj = {
        db: db,
        tableName: projectsTable, 
        predicateNames: ["id"],
        predicateValues: [id]
    }
    return runDelete(obj);
}

export const runProjectInsertSingle = (db: Database, title: string) => {
    const obj = {
        db:db,
        tableName: projectsTable,
        fieldNames: ["title"],
        fieldValues: [title]
    }
    return runInsertSingle(obj)
}