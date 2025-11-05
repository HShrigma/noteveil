import { useState } from "react";
import Note from "./Note";

export const NotesHolder = () => {
    // Temp notes
    const tempNotes = [
        {title:"Note 1", content: "Example Note 1 content"},
        {title:"Note 2", content: "Example Note 2 content"},
    ];
    const [notes, setNotes] = useState(tempNotes);
    return (
        <>
        {notes.map(note => <Note title={note.title} content={note.content}/>)}
        </>
    );
}

export default NotesHolder;