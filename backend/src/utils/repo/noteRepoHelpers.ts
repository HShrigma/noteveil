import { Database } from "better-sqlite3";
import { tableType } from "../../config/schema";
import { runUpdate } from "./repository";

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

