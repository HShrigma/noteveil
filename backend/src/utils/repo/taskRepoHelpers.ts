import { Database } from "better-sqlite3";
import { runDelete, runInsertSingle, runUpdate } from "./repository";
import { tableType } from "../../config/schema";

const tasksTable = tableType.tasks;
const taskListsTable = tableType.taskLists;

export const runTaskListNextIdUpdate = (db: Database, nextId: number | undefined, id: number) => {
    const obj = {
        db: db,
        tableName: taskListsTable, 
        fieldNames: ["next_id"],
        fieldValues: [nextId == -1 || !nextId ? null : nextId],
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

export const runTaskListDelete = (db: Database, id: number, predicateNames = ["id"], taskPredicateNames = ["task_list_id"]) => {
    const obj = {
        db: db,
        tableName: taskListsTable, 
        predicateNames: predicateNames,
        predicateValues: [id]
    }
    runTaskDelete(db, id, taskPredicateNames);
    return runDelete(obj);
}

export const runTaskDelete = (db: Database, id: number, predicateNames = ["id"]) => {
    const obj = {
        db: db,
        tableName: tasksTable, 
        predicateNames: predicateNames,
        predicateValues: [id]
    }
    return runDelete(obj);
}

export const runTaskListInsertSingle = (db: Database, projectId: number, title: string) => {
    const obj = {
        db:db,
        tableName: taskListsTable,
        fieldNames: ["title", "project_id"],
        fieldValues: [title, projectId]
    }
    return runInsertSingle(obj)
}

export const runTaskInsertSingle = (db: Database, label: string, task_list_id: number) => {
    const obj = {
        db:db,
        tableName: tasksTable,
        fieldNames: ["label", "task_list_id"],
        fieldValues: [label, task_list_id]
    }
    return runInsertSingle(obj)
}