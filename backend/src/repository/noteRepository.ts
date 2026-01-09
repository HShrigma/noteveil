import DB from "../config/db";
import { Note } from "../models/notes";
import { runNoteContentUpdate, runNoteDelete, runNoteInsertSingle, runNoteTitleUpdate } from "../utils/repo/noteRepoHelpers";

class NoteRepository {
    db = DB.getInstance().getConnection();

    getNotes() {
        const stmt = this.db.prepare(`
            SELECT n.* 
            FROM notes n
            JOIN projects p ON n.project_id = p.id
            ORDER BY n.created_at`);
        const rows = stmt.all() as Note[];
        return rows;
    }

    addNote() { return runNoteInsertSingle(this.db, "New Note", ""); }
    deleteNote(id: number) { return runNoteDelete(this.db, id) }
    updateNoteTitle(id: number, title: string) {return runNoteTitleUpdate(this.db, title, id);}
    updateNoteContent(id: number, content: string) { return runNoteContentUpdate(this.db, content, id) };
}

export default NoteRepository;