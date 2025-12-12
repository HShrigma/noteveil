import Database from "better-sqlite3";
import { error } from "console";

const TASKS: string = "TASKS";
const NOTES: string = "NOTES";
const TASK_LISTS: string = "TASK_LISTS";

export const tableType = {
    notes: NOTES,
    tasks: TASKS,
    taskLists: TASK_LISTS,
}

export class dbSchema {
    public static createTables = (params: string[], db: Database.Database) => {
        params.forEach(param => {
        try {
            db.exec(dbSchema.getTableCreateString(param));
        } catch (error) {
            console.error(`Error creating table ${param}:`, error);
            throw error; // Re-throw to stop initialization
        }
        });
    }
    static getTableCreateString(table: string) {
        switch(table){
            case TASKS:
                return dbSchema.createTasks();
            case NOTES:
                return dbSchema.createNotes();
            case TASK_LISTS:
                return dbSchema.createTaskLists();
            default:
                throw error(`No such table named: ${table}`);
        }
    }

    static createTasks(){
        return `CREATE TABLE IF NOT EXISTS tasks (
        id           INTEGER PRIMARY KEY AUTOINCREMENT,
        label        TEXT    NOT NULL,
        done         BOOLEAN DEFAULT FALSE,
        task_list_id INTEGER NOT NULL,  
        created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY  (task_list_id) REFERENCES task_lists(id) ON DELETE CASCADE
      )
        `;
    };
    static createNotes(){
        return `CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    };
    static createTaskLists(){
        return `CREATE TABLE IF NOT EXISTS task_lists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        next_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (next_id) REFERENCES task_lists(id) ON DELETE SET NULL
      )
    `;

    };
}


