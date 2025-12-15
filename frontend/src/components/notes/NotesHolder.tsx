import { useState } from 'react';
import Note  from './standalone/Note';
import type { NoteActivity } from '../../utils/registries';
import Masonry from "react-masonry-css";
import { useNotes } from '../../utils/notes/useNote';
import { NoteAdder } from './standalone/NoteAdder';

export const NotesHolder = () => {
    const breakpointColumnsObj = {
        default: 4,
        1024: 3,
        768: 2,
        500: 1,
    };

    const { notes, createNote, updateTitle, updateContent, removeNote } = useNotes();
    const [ActiveNote, setActiveNote] = useState<NoteActivity>({ id: 0, active: false });
    const [focusTarget, setFocusTarget] = useState<'title' | 'content' | null>(null);

    const updateActiveNote = (activity: NoteActivity) => {
        setActiveNote(activity);
        setFocusTarget(prev => prev ?? 'content');
    };

    async function onTitleSubmit  (id: number, title: string)  {
        setFocusTarget('content');
        updateActiveNote({ id, active: true });
        await updateTitle(id, title);
    };

    async function onNoteRemove(id: number) {
        setActiveNote({ id: 0, active: false });
        setFocusTarget(null);
        await removeNote(id);
    }

    async function onAddNote() {
        const newNoteId = await createNote();
        if(!newNoteId) return;
        setFocusTarget('title');
        setActiveNote({ id: newNoteId, active: true });
    }

    return (
        <div className="mt-2">
            <NoteAdder notes={notes} onAddNote={onAddNote} disabled={true} />
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex gap-4"
                columnClassName="flex flex-col gap-4"
            >
                {notes.map((note, index) => (
                    <div key={index} className="break-inside-avoid mb-4 fade-in">
                        <Note
                            key={note.id}
                            data={note}
                            isActive={note.id === ActiveNote.id ? ActiveNote.active : false}
                            focusTarget={note.id === ActiveNote.id ? focusTarget : null}
                            onNoteFocus={updateActiveNote}
                            onNoteDelete={onNoteRemove}
                            onTitleSubmit={onTitleSubmit}
                            onNoteSubmit={updateContent}
                        />
                    </div>
                ))}
            </Masonry>
        </div>
    );
}

export default NotesHolder;
