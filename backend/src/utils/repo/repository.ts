import { Database } from "better-sqlite3";
import { error } from "console";

const errMsgFieldMismatch = "Cannot run update with uneven number of field names and values";
const errMsgPredicateMismatch = "Cannot run update with uneven number of predicate names and values";

interface deleteObject{
    db: Database;
    tableName: string;
    predicateNames: string[];
    predicateValues: any[];
}
interface insertObject{
    db: Database;
    tableName: string;
    fieldNames: string[];
    fieldValues: any[];
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
    if(obj.fieldNames.length !== obj.fieldValues.length) throw error(errMsgFieldMismatch);
    if(obj.predicateNames.length !== obj.predicateValues.length) throw error(errMsgPredicateMismatch);

    const stmt = obj.db.prepare(getUpdateQuery(obj));
    const result = stmt.run([...obj.fieldValues], [...obj.predicateValues]);
    return result;
}

export const runInsertSingle = (obj:insertObject) =>{
    if(obj.fieldNames.length !== obj.fieldValues.length) throw error(errMsgFieldMismatch);
    const stmt = obj.db.prepare(getInsertSingleQuery(obj));
    const result = stmt.run([...obj.fieldValues]);
    return result;
}

export const runDelete = (obj: deleteObject) => {
    if (obj.predicateNames.length !== obj.predicateValues.length) throw error(errMsgPredicateMismatch);

    const stmt = obj.db.prepare(getDeleteQuery(obj));
    const result = stmt.run([...obj.predicateValues]);
    return result;
}

const getColsEquals = (fieldNames: string[]) => {
    fieldNames = fieldNames.map(name => `${name} = ?`);
    return fieldNames.join(", ");
}
const getArrToQuestionmarks = (arr:any[]) => {
    return arr.map(el => "?").join(",");
}
const getUpdateQuery = (obj: updateObject) => {
   return `UPDATE ${obj.tableName} SET ${getColsEquals(obj.fieldNames)} WHERE ${getColsEquals(obj.predicateNames)}`;
}

const getDeleteQuery = (obj: deleteObject) => {
    return `DELETE FROM ${obj.tableName} WHERE ${getColsEquals(obj.predicateNames)}`;
}

const getInsertSingleQuery = (obj: insertObject) => {
    return `INSERT INTO ${obj.tableName} (${obj.fieldNames.join(", ")}) VALUES(${getArrToQuestionmarks(obj.fieldValues)})`;
}