export class NoteService {
    notes = [{id:1, title:"", content: ""}];

    public getAllNotes() {
        return this.notes;
    }

    addNote(id: number) {
        const newNote = { id: id, title: '', content: '' };
        this.notes.push(newNote);
        return { id: id };
    }

    deleteNote(id: number) {
        const initialLength = this.notes.length;
        this.notes = this.notes.filter(note => note.id !== id);
        
        return { deleted: this.notes.length < initialLength, id: id };
    }

    updateNoteTitle(id: number, title: string) {
        const index = this.notes.findIndex(t => t.id === id);
        if (index === -1) return null;

        this.notes[index].title = title;
        return { id, title };
    }

    updateNoteContent(id: number, content: string) {
        const index = this.notes.findIndex(t => t.id === id);
        if (index === -1) return null;

        this.notes[index].content = content;
        return { id, content };
    }
}

export default new NoteService();