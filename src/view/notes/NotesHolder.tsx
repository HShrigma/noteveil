import { useState } from "react";
import Note from "./Note";
import { NoteBlockSeparator } from "../utils/registries";

export const NotesHolder = () => {
    // Temp notes
    const tempNotes = [
        { title: "MD Header Note", content: `# H1${NoteBlockSeparator}## H2${NoteBlockSeparator}### H3` },
        { title: "MD Stylized", content: `none${NoteBlockSeparator}*italics*${NoteBlockSeparator}**bold**${NoteBlockSeparator}***bolditalics***` },
        { title: "MD Specials", content: `### ---${NoteBlockSeparator}---${NoteBlockSeparator}### *empty*${NoteBlockSeparator}` },
        { title: "MD ulist Note", content: `-   l1${NoteBlockSeparator}    -l2${NoteBlockSeparator}   -l3` },
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