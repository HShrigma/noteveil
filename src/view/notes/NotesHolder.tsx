import { useState } from 'react';
import Note from './Note';

export const NotesHolder = () => {
    // Temp notes
    const tempNotes = [
        { title: 'MD Header Note', content: '# H1\n## H2\n### H3' },
        { title: 'MD Stylized', content: 'none\n*italics*\n**bold**\n***bolditalics***' },
        { title: 'MD Specials', content: '### ---\n---\n### *empty*\n' },
        { title: 'MD ulist Note', content: '-   l1\n    -l2\n   -l3' },
    ];
    const [notes, setNotes] = useState(tempNotes);

    const [activeNoteIndex,setActiveNoteIndex] = useState(0);

    const checkActiveNote = (index: number) => { 
        setActiveNoteIndex(index);
    };
    
    const onContentChangeHanlder = ( index: number, content:string) => {
        const newNotes = [...notes];
        newNotes[index].content = content;
    };
    
    return (
        <>
            {notes.map((note, index) => <Note 
                key={index}
                id={index}
                title={note.title}
                content={note.content} 
                isActive={index === activeNoteIndex}
                onNoteFocus={() => checkActiveNote(index)}
                onContentChange={onContentChangeHanlder}
            />)}
        </>
    );
}

export default NotesHolder;