import { useState } from "react";
import Note from "./Note";

export const NotesHolder = () => {
    // Temp notes
    const tempNotes = [
        {title:"Note 1", content: "Example Note 1 Block 1\n Block 2"},
        {title:"Note 2", content: "Example Note 1 Block 1\n Block 2"},
    ];
    const [notes, setNotes] = useState(tempNotes);
    return (
        <>
        {notes.map(note => <Note title={note.title} content={note.content}/>)}
        </>
    );
}

export default NotesHolder;