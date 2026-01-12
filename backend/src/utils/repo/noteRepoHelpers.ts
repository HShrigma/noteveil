import { Database } from "better-sqlite3";
import { tableType } from "../../config/schema";
import { runDelete, runInsertSingle, runUpdate } from "./repository";

const notesTable = tableType.notes;

export const runNoteTitleUpdate = (db: Database, title: string, id: number) => {
    const obj = {
        db: db,
        tableName: notesTable, 
        fieldNames: ["title"],
        fieldValues: [title],
        predicateNames: ["id"],
        predicateValues: [id]
    }
    return runUpdate(obj);
}

export const runNoteContentUpdate = (db: Database, content: string, id: number) => {
    const obj = {
        db: db,
        tableName: notesTable, 
        fieldNames: ["content"],
        fieldValues: [content],
        predicateNames: ["id"],
        predicateValues: [id]
    }
    return runUpdate(obj);
}

export const runNoteDelete = (db: Database, id: number, predicateNames = ["id"]) => {
    const obj = {
        db: db,
        tableName: notesTable, 
        predicateNames: predicateNames,
        predicateValues: [id]
    }
    return runDelete(obj);
}

export const runNoteInsertSingle = (db: Database, title: string, content: string, projectId: number) => {
    const obj = {
        db:db,
        tableName: notesTable,
        fieldNames: ["title","content", "project_id"],
        fieldValues: [title, content, projectId]
    }
    return runInsertSingle(obj)
}