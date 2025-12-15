import { useState } from 'react';
import Note  from './standalone/Note';
import type { NoteActivity } from '../../utils/registries';
import { Plus } from 'lucide-react';
import Masonry from "react-masonry-css";
import { triggerScreenShake, triggerScreenBob } from "../../utils/screenShake";
import { useNotes } from '../../utils/notes/useNote';

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
        setActiveNote({ id, active: true });
        triggerScreenBob(200);
        await updateTitle(id, title);
    };

    async function onNoteRemove(id: number) {
        triggerScreenShake(250);
        setActiveNote({ id: 0, active: false });
        setFocusTarget(null);

        await removeNote(id);
    }

    async function onAddNote() {
        if (notes.some(n => n.title === '' || n.content === '')) return;

        const newNoteId = await createNote();
        setFocusTarget('title');
        setActiveNote({ id: newNoteId, active: true });
        triggerScreenBob();
    }

    return (
        <div className="mt-2">
            <div className="flex justify-start mb-4">
                <button
                    onClick={onAddNote}
                    className="flex items-center gap-2 px-3 py-1 rounded-full border-2 border-green-500 bg-green-500 text-[#f6faff]
                 hover:bg-[#9ece6a] hover:shadow-[0_0_10px_#9ece6a] transition-all duration-150"
                >
                    <Plus size={18} strokeWidth={3} /> Add Note
                </button>
            </div>

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
