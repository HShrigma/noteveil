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

    const updateActiveNote = (activity: NoteActivity) => { 
        activity.index %= notes.length;
        setActiveNote(activity);
    };
    
    const onContentChangeHanlder = ( index: number, content:string) => {
        const newNotes = [...notes];
        newNotes[index].content = content;
        setNotes(newNotes);
    };
    const onAddNote = () => {
        const newNotes = [...notes];
        newNotes.unshift({ title: 'new', content : ''})
        setNotes(newNotes);
    } 
    return (
        <div>
            <button onClick={ onAddNote}>Add Note</button>
            {notes.map((note, index) => <Note 
                key={index}
                id={index}
                title={note.title}
                content={note.content} 
                isActive={index === ActiveNote.index ? ActiveNote.active : false}
                onNoteFocus={updateActiveNote}
                onContentChange={onContentChangeHanlder}
            />)}
        </div>
    );
}

export default NotesHolder;