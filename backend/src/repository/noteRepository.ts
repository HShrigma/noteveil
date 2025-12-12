import DB from "../config/db";
import { tableType } from "../config/schema";
import { Note } from "../models/notes";
import { deleteWithId, updateSingularById } from "../utils/repository";

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
    deleteNote(id: number) { return deleteWithId(this.db, id, tableType.notes); }
    updateNoteTitle(id: number, title: string) {
        return updateSingularById(this.db, tableType.notes, "title", title, "id", id);
    }

    updateNoteContent(id: number, content: string) {
        return updateSingularById(this.db, tableType.notes, "content", content, "id", id);
    }
}

export default NoteRepository;