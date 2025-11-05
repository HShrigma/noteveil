import { useState } from "react";
import Note from "./Note";

export const NotesHolder = () => {
    // Temp notes
    const tempNotes = [
        { title: "MD Header Note", content: "# H1\n## H2\n### H3" },
        { title: "Note 1", content: "Example Note 1 Block 1\n Block 2" },
        { title: "Note 2", content: "Example Note 2 Block 1\n Block 2" },
    ];
    const [notes, setNotes] = useState(tempNotes);

    const [activeNoteIndex,setActiveNoteIndex] = useState(0);

    const checkActiveNote = (index: number) => { 
        setActiveNoteIndex(index)
    };
    
    return (
        <>
            {notes.map((note, index) => <Note 
                key={index}
                title={note.title}
                content={note.content} 
                isActive={index === activeNoteIndex}
                onNoteFocus={() => checkActiveNote(index)
                }
            />)}
        </>
    );
}

export default NotesHolder;