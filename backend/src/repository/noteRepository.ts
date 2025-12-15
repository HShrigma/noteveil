import DB from "../config/db";
import { Note } from "../models/notes";
import { runNoteContentUpdate, runNoteDelete, runNoteTitleUpdate } from "../utils/repo/noteRepoHelpers";

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

    deleteNote(id: number) { return runNoteDelete(this.db, id) }
    updateNoteTitle(id: number, title: string) {return runNoteTitleUpdate(this.db, title, id);}
    updateNoteContent(id: number, content: string) { return runNoteContentUpdate(this.db, content, id) };
}

export default NoteRepository;