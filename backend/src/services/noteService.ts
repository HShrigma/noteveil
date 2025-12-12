import DB from "../config/db";
import { Note } from "../models/notes";

export class NoteService {
    notes = [{id:1, title:"", content: ""}];
    db = DB.getInstance().getConnection();

    public getAllNotes() {
        try{
            const stmt = this.db.prepare(`SELECT * FROM Notes ORDER BY created_at DESC`);
            const rows = stmt.all() as Note[];
            return rows;
        } catch (error) {return null}
    }

    addNote() {
        try{
            const title = "New Note";
            const stmt = this.db.prepare(`INSERT INTO notes (title, content) VALUES (?, ?)`);
            const result = stmt.run(title, "");
            return {id: result.lastInsertRowid as number};
        } catch(error) {return null}
    }

    deleteNote(id: number) {
        try{
            const stmt = this.db.prepare(`DELETE FROM notes WHERE id = ?`);
            const result = stmt.run(id);
            return {id: result.lastInsertRowid as number};
        } catch(error) {return null}
    }

    updateNoteTitle(id: number, title: string) {
        try{
            const stmt = this.db.prepare(`UPDATE notes SET title = ? WHERE id = ?`);
            const result = stmt.run(title, id);
            return {id: result.lastInsertRowid as number};
        } catch(error) {return null}
    }

    updateNoteContent(id: number, content: string) {
        try{
            const stmt = this.db.prepare(`UPDATE notes SET content = ? WHERE id = ?`);
            const result = stmt.run(content, id);
            return {id: result.lastInsertRowid as number};
        } catch(error) {return null}
    }
}

export default new NoteService();