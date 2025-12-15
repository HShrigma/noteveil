import { Database } from "better-sqlite3";
import { error } from "console";
import { tableType } from "../../config/schema";


interface deleteObject{
    db: Database;
    tableName: string;
    predicateNames: string[];
    predicateValues: any[];
}

interface updateObject{
    db: Database;
    tableName: string;
    fieldNames: string[];
    fieldValues: any[];
    predicateNames: string[];
    predicateValues: any[];
}

export const runUpdate = (obj: updateObject) => {
    if(obj.fieldNames.length !== obj.fieldValues.length) throw error("Cannot run update with uneven number of field names and values");
    if(obj.predicateNames.length !== obj.predicateValues.length) throw error("Cannot run update with uneven number of predicate names and values");

    const stmt = obj.db.prepare(getUpdateQuery(obj));
    const result = stmt.run([...obj.fieldValues], [...obj.predicateValues]);
    return result;
}

export const runDelete = (obj: deleteObject) => {
    if (obj.predicateNames.length !== obj.predicateValues.length) throw error("Cannot run update with uneven number of predicate names and values");

    const stmt = obj.db.prepare(getDeleteQuery(obj));
    const result = stmt.run([...obj.predicateValues]);
    return result;
}
const getColsEquals = (fieldNames: string[]) => {
    fieldNames = fieldNames.map(name => `${name}  = ?`);
    return fieldNames.join(", ");
}

const getUpdateQuery = (obj: updateObject) => {
   return `UPDATE ${obj.tableName} SET ${getColsEquals(obj.fieldNames)} WHERE ${getColsEquals(obj.predicateNames)}`;
}

const getDeleteQuery = (obj: deleteObject) => {
    return `DELETE FROM ${obj.tableName} WHERE ${getColsEquals(obj.predicateNames)}`;
}