import { useState } from 'react';
import Note from './Note';

type NoteActivity = {
    index: number,
    active: boolean
};

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
        setActiveNote(activity);
    };
    
    const onContentChangeHanlder = ( index: number, content:string) => {
        const newNotes = [...notes];
        newNotes[index].content = content;
        setNotes(newNotes);
    };
    
    return (
        <>
            {notes.map((note, index) => <Note 
                key={index}
                id={index}
                title={note.title}
                content={note.content} 
                isActive={index === ActiveNote.index ? ActiveNote.active : false}
                onNoteFocus={() => updateActiveNote({index,active:true})}
                onContentChange={onContentChangeHanlder}
            />)}
        </>
    );
}

export default NotesHolder;