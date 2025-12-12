import { Database } from "better-sqlite3";

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