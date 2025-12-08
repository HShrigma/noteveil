import { useEffect, useState } from 'react';
import Note, { NoteData } from './Note';
import type { NoteActivity } from '../../utils/registries';
import { Plus } from 'lucide-react';
import Masonry from "react-masonry-css";
import { triggerScreenShake, triggerScreenBob } from "../../utils/screenShake";
import { deleteNote, fetchNotes } from '../../api/notesApi';

export const NotesHolder = () => {
    const breakpointColumnsObj = {
        default: 4,
        1024: 3,
        768: 2,
        500: 1,
    };

    const [notes, setNotes] = useState<NoteData[]>([]);
    const [maxId, setMaxId] = useState(5);

    useEffect(() => {
        fetchNotes().then(setNotes);
    }, []);

    const [ActiveNote, setActiveNote] = useState<NoteActivity>({ id: 0, active: false });
    const [focusTarget, setFocusTarget] = useState<'title' | 'content' | null>(null);

    const getNoteIndexById = (id: number) => {
        return notes.findIndex(t => t.id === id);
    }
    const getNoteById = (id: number) => {
        return notes[getNoteIndexById(id)];
    }
    const updateActiveNote = (activity: NoteActivity) => {
        activity.id = getNoteIndexById(activity.id) ? activity.id : notes[0].id;
        setActiveNote(activity);
        setFocusTarget((prev) => prev ?? 'content');
    };

    const onTitleChangeHandler = (id: number, title: string) => {
        const newNotes = [...notes];
        newNotes[getNoteIndexById(id)].title = title;
        setNotes(newNotes);
    };

    const onContentChangeHandler = (id: number, content: string) => {
        const newNotes = [...notes];
        newNotes[getNoteIndexById(id)].content = content;
        setNotes(newNotes);
    };

    const onTitleSubmit = (id: number) => {
        setFocusTarget('content');
        setActiveNote({ id, active: true });
        triggerScreenBob(200);
    };

    async function removeNote(id: number) {
        const index = getNoteIndexById(id);
        if (index === -1) return;

        const newNotes = [...notes];
        setNotes((prev) => prev.filter(t => t.id !== id));
        setActiveNote({ id: 0, active: false });
        setFocusTarget(null);

        await deleteNote(id);
    }

    const onNoteDelete = (id: number) => {
        removeNote(id);
        triggerScreenShake(250);
    }

    const onAddNote = () => {
        if (notes.some((note) => note.title === '' || note.content === '')) return;
        const newNotes = [...notes];
        newNotes.push({ id: maxId,title: '', content: '' })
        setNotes(newNotes);
        setFocusTarget('title');
        setActiveNote({ id: maxId, active: true });
        setMaxId(prev => prev + 1);
        triggerScreenBob();
    };

    return (
        <div className="mt-2">
            {/* Add Note Button */}
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
                {/* Notes List */}
                {notes.map((note, index) => (
                    <div key={index} className="break-inside-avoid mb-4 fade-in">
                        <Note
                            key={note.id}
                            data={note}
                            isActive={note.id === ActiveNote.id ? ActiveNote.active : false}
                            focusTarget={note.id === ActiveNote.id ? focusTarget : null}
                            onNoteFocus={updateActiveNote}
                            onNoteDelete={onNoteDelete}
                            onContentChange={onContentChangeHandler}
                            onTitleChange={onTitleChangeHandler}
                            onTitleSubmit={onTitleSubmit}
                            clearFocusTarget={() => setFocusTarget(null)}
                        />
                    </div>
                ))}
            </Masonry>
        </div>
    );
}

export default NotesHolder;