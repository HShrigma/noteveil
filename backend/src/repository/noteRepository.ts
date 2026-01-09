import DB from "../config/db";
import { Note } from "../models/notes";
import { runNoteContentUpdate, runNoteDelete, runNoteInsertSingle, runNoteTitleUpdate } from "../utils/repo/noteRepoHelpers";

class NoteRepository {
    db = DB.getInstance().getConnection();

    getNotes(projectId: number) {
        const stmt = this.db.prepare(`
            SELECT * 
            FROM notes n
            WHERE project_id = ?
            ORDER BY created_at`);
        const rows = stmt.all(projectId) as Note[];
        return rows;
    }

    addNote(projectId: number) { return runNoteInsertSingle(this.db, "New Note", "", projectId); }
    deleteNote(id: number) { return runNoteDelete(this.db, id) }
    updateNoteTitle(id: number, title: string) {return runNoteTitleUpdate(this.db, title, id);}
    updateNoteContent(id: number, content: string) { return runNoteContentUpdate(this.db, content, id) };
}

export default NoteRepository;