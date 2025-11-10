import { useState } from 'react';
import Note from './Note';
import type { NoteActivity } from '../utils/registries';

export const NotesHolder = () => {
    // Temp notes
    const tempNotes = [
        { title: 'MD Header Note', content: '# H1\n## H2\n### H3' },
        { title: 'MD Stylized', content: 'none\n*italics*\n**bold**\n***bolditalics***' },
        { title: 'MD Specials', content: '### ---\n---\n### *empty*\n' },
        { title: 'MD ulist Note', content: '- l1 \n  - l2'},
    ];
    const [notes, setNotes] = useState(tempNotes);

    const [ActiveNote, setActiveNote] = useState<NoteActivity>({ index: 0, active: false });
    const [focusTarget, setFocusTarget] = useState<'title' | 'content' | null>(null);

    const updateActiveNote = (activity: NoteActivity) => { 
        activity.index %= notes.length;
        setActiveNote(activity);
    };

    const onTitleChangeHandler = (index: number, title: string) => {
        const newNotes = [...notes];
        newNotes[index].title = title;
        setNotes(newNotes);
    };

    const onContentChangeHandler = ( index: number, content:string) => {
        const newNotes = [...notes];
        newNotes[index].content = content;
        setNotes(newNotes);
    };

    const onTitleSubmit = (index: number) => {
        setFocusTarget('content');
        setActiveNote({ index, active: true });
    };

    const onAddNote = () => {
        if(notes.some((note) => note.title === '' || note.content === '')) return;
        const newNotes = [...notes];
        newNotes.unshift({ title: '', content : ''})
        setNotes(newNotes);
        setFocusTarget('title');
        setActiveNote({ index: 0, active: true });
    };

    return (
        <div>
            <button onClick={onAddNote}>Add Note</button>
            {notes.map((note, index) => (
                <Note 
                    key={index}
                    id={index}
                    title={note.title}
                    content={note.content} 
                    isActive={index === ActiveNote.index ? ActiveNote.active : false}
                    focusTarget={index === ActiveNote.index ? focusTarget : null}
                    onNoteFocus={updateActiveNote}
                    onContentChange={onContentChangeHandler}
                    onTitleChange={onTitleChangeHandler}
                    onTitleSubmit={onTitleSubmit}
                    clearFocusTarget={() => setFocusTarget(null)}
                />
            ))}
        </div>
    );
}

export default NotesHolder;