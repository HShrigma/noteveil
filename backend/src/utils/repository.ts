import { Database } from "better-sqlite3";
import { error } from "console";
import { tableType } from "../config/schema";

const notesTable = tableType.notes;
const tasksTable = tableType.tasks;
const taskListsTable = tableType.taskLists;

interface updateObject{
    db: Database;
    tableName: string;
    fieldNames: string[];
    fieldValues: any[];
    predicateNames: string[];
    predicateValues: any[];
}

export const deleteWithId = (db: Database, id: number, tableName: string, idName = "id") => {
    const stmt = db.prepare(`DELETE FROM ${tableName} WHERE ${idName} = ?`);
    const result = stmt.run(id);
    return result;
}

export const updateSingularById = <T, U>(
    db: Database,
    tableName: string,
    fieldName: string,
    value: T,
    predicateName: string,
    predicate: U
) => {
    const stmt = db.prepare(`UPDATE ${tableName} SET ${fieldName} = ? WHERE ${predicateName} = ?`);
    const result = stmt.run(value, predicate);
    return result;
}

export const runUpdate = (obj: updateObject) => {
    if(obj.fieldNames.length !== obj.fieldValues.length) throw error("Cannot run update with uneven number of field names and values");
    if(obj.predicateNames.length !== obj.predicateValues.length) throw error("Cannot run update with uneven number of predicate names and values");

    const stmt = obj.db.prepare(getUpdateQuery(obj));
    const result = stmt.run([...obj.fieldValues], [...obj.predicateValues]);
    return result;
}

const getColsEquals = (fieldNames: string[]) => {
    fieldNames = fieldNames.map(name => `${name}  = ?`);
    return fieldNames.join(", ");
}
const getUpdateQuery = (obj: updateObject) => {
    const query = `UPDATE ${obj.tableName} SET ${getColsEquals(obj.fieldNames)} WHERE ${getColsEquals(obj.predicateNames)}`;
    return query;
}

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

export const runTaskListNextIdUpdate = (db: Database, nextId: number | undefined, id: number) => {
    const obj = {
        db: db,
        tableName: taskListsTable, 
        fieldNames: ["next_id"],
        fieldValues: [nextId],
        predicateNames: ["id"],
        predicateValues: [id]
    }
    return runUpdate(obj);
}

export const runTaskListTitleUpdate = (db: Database, title: string, id: number) => {
    const obj = {
        db: db,
        tableName: taskListsTable, 
        fieldNames: ["title"],
        fieldValues: [title],
        predicateNames: ["id"],
        predicateValues: [id]
    }
    return runUpdate(obj);
}

export const runTaskDoneUpdate = (db: Database, done: boolean, id: number) => {
    const obj = {
        db: db,
        tableName: tasksTable, 
        fieldNames: ["done"],
        fieldValues: [done ? 1 : 0],
        predicateNames: ["id"],
        predicateValues: [id]
    }
    return runUpdate(obj);
}

export const runTaskLabelUpdate = (db: Database, label: string, id: number) => {
    const obj = {
        db: db,
        tableName: tasksTable, 
        fieldNames: ["label"],
        fieldValues: [label],
        predicateNames: ["id"],
        predicateValues: [id]
    }
    return runUpdate(obj);
}
