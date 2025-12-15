import { Database } from "better-sqlite3";
import { runDelete, runUpdate } from "./repository";
import { tableType } from "../../config/schema";

const tasksTable = tableType.tasks;
const taskListsTable = tableType.taskLists;

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

export const runTaskListDelete = (db: Database, id: number) => {
    const obj = {
        db: db,
        tableName: taskListsTable, 
        predicateNames: ["id"],
        predicateValues: [id]
    }
    return runDelete(obj);
}

export const runTaskDelete = (db: Database, id: number) => {
    const obj = {
        db: db,
        tableName: tasksTable, 
        predicateNames: ["id"],
        predicateValues: [id]
    }
    return runDelete(obj);
}
