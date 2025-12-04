import { useState } from 'react';
import Note from './Note';
import type { NoteActivity } from '../utils/registries';
import { Plus } from 'lucide-react';
import Masonry from "react-masonry-css";
import { triggerScreenShake, triggerScreenBob } from "../utils/screenShake";

export const NotesHolder = () => {
    const breakpointColumnsObj = {
        default: 4,
        1024: 3,
        768: 2,
        500: 1,
    };

    // Temp notes
    const tempNotes = [
        { title: 'MD Header Note', content: '# H1\n## H2\n### H3' },
        { title: 'MD Stylized', content: 'none\n*italics*\n**bold**\n***bolditalics***' },
        { title: 'MD Specials', content: '### ---\n---\n### *empty*\n' },
        { title: 'MD ulist Note', content: '- l1 \n  - l2' },
    ];
    const [notes, setNotes] = useState(tempNotes);

    const [ActiveNote, setActiveNote] = useState<NoteActivity>({ index: 0, active: false });
    const [focusTarget, setFocusTarget] = useState<'title' | 'content' | null>(null);

    const updateActiveNote = (activity: NoteActivity) => {
        activity.index %= notes.length;
        setActiveNote(activity);
        setFocusTarget((prev) => prev ?? 'content');
    };

    const onTitleChangeHandler = (index: number, title: string) => {
        const newNotes = [...notes];
        newNotes[index].title = title;
        setNotes(newNotes);
    };

    const onContentChangeHandler = (index: number, content: string) => {
        const newNotes = [...notes];
        newNotes[index].content = content;
        setNotes(newNotes);
    };

    const onTitleSubmit = (index: number) => {
        setFocusTarget('content');
        setActiveNote({ index, active: true });
        triggerScreenBob(200);
    };

    const deleteNote = (index: number) => {
        if (!notes[index]) return;

        const newNotes = [...notes];
        newNotes.splice(index, 1);

        setNotes(newNotes);
        setActiveNote({ index: 0, active: false });
        setFocusTarget(null);
    }

    const onNoteDelete = (index: number) => {
        deleteNote(index);
        triggerScreenShake(250);
    }

    const onAddNote = () => {
        if (notes.some((note) => note.title === '' || note.content === '')) return;
        const newNotes = [...notes];
        newNotes.push({ title: '', content: '' })
        setNotes(newNotes);
        setFocusTarget('title');
        setActiveNote({ index: newNotes.length - 1, active: true });
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
                            key={index}
                            id={index}
                            title={note.title}
                            content={note.content}
                            isActive={index === ActiveNote.index ? ActiveNote.active : false}
                            focusTarget={index === ActiveNote.index ? focusTarget : null}
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