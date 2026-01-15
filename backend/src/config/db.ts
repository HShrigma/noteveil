import Database from 'better-sqlite3';
import path from 'path';
import { dbSchema, tableType } from './schema';

class DB{
    private static instance: DB;
    private db: Database.Database;

    private constructor(){
        const dbPath = path.resolve(__dirname,'../../db/app.db');
        this.db = new Database(dbPath);
        this.db.pragma('foreign_keys = ON');
        this.initSchema();
    }

    private initSchema() {
        const toCreate = [tableType.users, tableType.projects, tableType.taskLists, tableType.tasks, tableType.notes];
        dbSchema.createTables(toCreate, this.db);
    }

    static getInstance(): DB {
        if (!DB.instance) {
            DB.instance = new DB();
        }
        return DB.instance;
    }

    getConnection(): Database.Database {
        return this.db;
    }

    close(): void {
        this.db.close();
    }

    static closeInstance(): void {
        if (DB.instance) {
            DB.instance.close();
        }
    }
}

export default DB;