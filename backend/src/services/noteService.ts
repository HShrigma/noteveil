import NoteRepository from "../repository/noteRepository";
import { runService } from "../utils/service";

export class NoteService {
    repo = new NoteRepository();

    getAllNotes(id: number) {
        return runService(() => this.repo.getNotes(id), 'Error fetching notes:');
    }

    addNote(projectId: number) {
        const res = runService(() => this.repo.addNote(projectId),'Error adding note:');
        return res ? {id: res.lastInsertRowid as number} : null;
    }

    deleteNote(id: number) {
        const res = runService(() => this.repo.deleteNote(id),'Error deleting note:');
        return res ? { deleted: res.changes > 0, id: id } : null;
    }

    updateNoteTitle(id: number, title: string) {
        const res = runService(() => this.repo.updateNoteTitle(id, title),
            'Error updating note title:');
        return res ? { updated: res.changes > 0, id: id, title: title  } : null;
    }

    updateNoteContent(id: number, content: string) {
        const res = runService(() => this.repo.updateNoteContent(id,content),
            'Error updating note content:');
        return res ? { updated: res.changes > 0, id: id, content: content  } : null;
    }
}

export default new NoteService();