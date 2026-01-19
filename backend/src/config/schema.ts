import Database from "better-sqlite3";
import { error } from "console";

const TASKS: string = "tasks";
const NOTES: string = "notes";
const TASK_LISTS: string = "task_lists";
const PROJECTS: string = "projects";
const USERS: string = "users";

export const tableType = {
    notes: NOTES,
    tasks: TASKS,
    taskLists: TASK_LISTS,
    projects: PROJECTS,
    users: USERS
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
            case PROJECTS:
                return dbSchema.createProjects();
            case USERS:
                return dbSchema.createUsers();
            default:
                throw error(`No such table named: ${table}`);
        }
    }
    public static dropTables = (params: string[], db: Database.Database) => {
        params.forEach(param => {
        try {
            db.exec(dbSchema.dropTable(param));
        } catch (error) {
            console.error(`Error creating table ${param}:`, error);
            throw error; // Re-throw to stop initialization
        }
        });
 
    }
    static dropTable(tableName: string) {
        return `DROP TABLE IF EXISTS ${tableName}`;
    }

    static createUsers() {
        return `CREATE TABLE IF NOT EXISTS users (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        email       TEXT NOT NULL,
        name        TEXT NOT NULL,
        password    TEXT,
        from_auth   BOOLEAN DEFAULT FALSE,
        created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
        )`;
    }

    static createProjects() {
        return `CREATE TABLE IF NOT EXISTS projects (
        id           INTEGER PRIMARY KEY AUTOINCREMENT,
        title        TEXT NOT NULL,
        created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
        user_id      INTEGER NOT NULL,
        FOREIGN KEY  (user_id) REFERENCES users(id) ON DELETE CASCADE
        )`;
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
        project_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
      )
    `;

    };

    static createTaskLists(){
        return `CREATE TABLE IF NOT EXISTS task_lists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        next_id INTEGER,
        project_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (next_id) REFERENCES task_lists(id) ON DELETE SET NULL,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
      )
    `;
    };
}
