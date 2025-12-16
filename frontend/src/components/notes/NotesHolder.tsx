import Note from './standalone/Note';
import Masonry from "react-masonry-css";
import { useNotes } from '../../utils/notes/useNote';
import { NoteAdder } from './standalone/NoteAdder';
import { NotesActivity } from '../../utils/notes/noteTypes';
import { useState } from 'react';
import { getIndex } from '../../utils/notes/noteHelpers';
import { discardMsgNoteContent, discardMsgNoteTitle } from '../../utils/registries';

export const NotesHolder = () => {
    const breakpointColumnsObj = {
        default: 4,
        1024: 3,
        768: 2,
        500: 1,
    };

    const { notes, createNote, updateTitle, updateContent, removeNote } = useNotes();
    const [activeNote, setActiveNote] = useState<NotesActivity>(null);

    const isAdderDisabled = () => {
        return activeNote !== null;
    }
    const confirmDiscardIfDirty = async (reqtype:string): Promise<boolean> => {
        if (activeNote === null) return true;

        const { id, type, value } = activeNote;
        const idx = getIndex(id, notes);
        if (idx === -1) return true;

        const currentValue = notes[idx][type];

        if (value.trim() === currentValue.trim()) {
            return true;
        }

        return window.confirm(reqtype === "title" ? discardMsgNoteTitle : discardMsgNoteContent);
    };

    const handleActivityRequest = async (req: NotesActivity) => {
        console.log("handling req");
        
        console.log(`req data: ${req === null ? " req is null" :req}`);
        
        if (activeNote === null || req === null) {
            setActiveNote(req);
            return;
        }

        // Same activity - allow
        if (req.id === activeNote.id && req.type === activeNote.type) {
            setActiveNote(req);
            return;
        }

        // Ask user
        const canLeave = await confirmDiscardIfDirty(req.type);
        if (!canLeave) return;

        setActiveNote(req);
    };


    async function onTitleSubmit(id: number, title: string) {
        const value = notes[getIndex(id, notes)].content;
        setActiveNote({ id, type: "content", value });
        await updateTitle(id, title);
    };

    async function onNoteRemove(id: number) {
        setActiveNote(null);
        await removeNote(id);
    }
    const onNoteSubmit = async (id: number, content: string) => {
        setActiveNote(null);
        await updateContent(id, content);
    }
    async function onAddNote() {
        const id = await createNote();
        if (!id) return;

        setActiveNote({ id: id, type: "title", value: "New Note" });
    }

    return (
        <div className="mt-2">
            <NoteAdder notes={notes} onAddNote={onAddNote} disabled={isAdderDisabled()} />
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
                            activity={activeNote}
                            onNoteDelete={onNoteRemove}
                            onTitleSubmit={onTitleSubmit}
                            onNoteSubmit={onNoteSubmit}
                            onActivityUpdate={handleActivityRequest}
                        />
                    </div>
                ))}
            </Masonry>
        </div>
    );
}

export default NotesHolder;
