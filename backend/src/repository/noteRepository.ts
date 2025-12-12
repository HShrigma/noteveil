import DB from "../config/db";
import { Note } from "../models/notes";

class NoteRepository {
    db = DB.getInstance().getConnection();

    getNotes() {
        const stmt = this.db.prepare(`SELECT * FROM notes ORDER BY created_at`);
        const rows = stmt.all() as Note[];
        return rows;
    }
    addNote() {
        const title = "New Note";
        const stmt = this.db.prepare(`INSERT INTO notes (title, content) VALUES (?, ?)`);
        const result = stmt.run(title, "");
        return result;
    }
    deleteNote(id: number) {
        const stmt = this.db.prepare(`DELETE FROM notes WHERE id = ?`);
        const result = stmt.run(id);
        return result;
    }
    updateNoteTitle(id: number, title: string) {
        const stmt = this.db.prepare(`UPDATE notes SET title = ? WHERE id = ?`);
        const result = stmt.run(title, id);
        return result;
    }

    updateNoteContent(id: number, content: string) {
        const stmt = this.db.prepare(`UPDATE notes SET content = ? WHERE id = ?`);
        const result = stmt.run(content, id);
        return result;
    }
}

export default NoteRepository;