import NoteRepository from "../repository/noteRepository";

export class NoteService {
    repo = new NoteRepository();

    public getAllNotes() {
        try {
            return this.repo.getNotes();
        } catch (error) {
            console.error('Error fetching notes:', error);
            return null;
        }
    }

    addNote() {
        try {
            const res = this.repo.addNote();
            return { id: res.lastInsertRowid as number };
        } catch (error) {
            console.error('Error adding note:', error);
            return null;
        }
    }

    deleteNote(id: number) {
        try {
            const res = this.repo.deleteNote(id);
            return { deleted: res.changes > 0, id: id };
        } catch (error) {
            console.error('Error deleting note:', error);
            return null;
        }
    }

    updateNoteTitle(id: number, title: string) {
        try {
            const res = this.repo.updateNoteTitle(id, title);
            return { updated: res.changes > 0, id: id, title: title };
        } catch (error) {
            console.error('Error updating note title:', error);
            return null;
        }
    }

    updateNoteContent(id: number, content: string) {
        try {
            const res = this.repo.updateNoteContent(id,content);
            return { updated: res.changes > 0, id: id, content: content };
        } catch (error) {
            console.error('Error updating note content:', error);
            return null;
        }
    }
}

export default new NoteService();