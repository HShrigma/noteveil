import DB from "../config/db";
import { Note } from "../models/notes";

export class NoteService {
    db = DB.getInstance().getConnection();

    public getAllNotes() {
        try {
            const stmt = this.db.prepare(`SELECT * FROM notes ORDER BY created_at`);
            const rows = stmt.all() as Note[];
            return rows;
        } catch (error) {
            console.error('Error fetching notes:', error);
            return null;
        }
    }

    addNote() {
        try {
            const title = "New Note";
            const stmt = this.db.prepare(`INSERT INTO notes (title, content) VALUES (?, ?)`);
            const result = stmt.run(title, "");
            return { id: result.lastInsertRowid as number };
        } catch (error) {
            console.error('Error adding note:', error);
            return null;
        }
    }

    deleteNote(id: number) {
        try {
            const stmt = this.db.prepare(`DELETE FROM notes WHERE id = ?`);
            const result = stmt.run(id);
            return { deleted: result.changes > 0, id: id };
        } catch (error) {
            console.error('Error deleting note:', error);
            return null;
        }
    }

    updateNoteTitle(id: number, title: string) {
        try {
            const stmt = this.db.prepare(`UPDATE notes SET title = ? WHERE id = ?`);
            const result = stmt.run(title, id);
            return { updated: result.changes > 0, id: id, title: title };
        } catch (error) {
            console.error('Error updating note title:', error);
            return null;
        }
    }

    updateNoteContent(id: number, content: string) {
        try {
            const stmt = this.db.prepare(`UPDATE notes SET content = ? WHERE id = ?`);
            const result = stmt.run(content, id);
            return { updated: result.changes > 0, id: id, content: content };
        } catch (error) {
            console.error('Error updating note content:', error);
            return null;
        }
    }
}

export default new NoteService();