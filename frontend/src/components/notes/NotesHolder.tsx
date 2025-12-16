import Note  from './standalone/Note';
import Masonry from "react-masonry-css";
import { useNotes } from '../../utils/notes/useNote';
import { NoteAdder } from './standalone/NoteAdder';
import { NotesActivity } from '../../utils/notes/noteTypes';
import { useState } from 'react';

export const NotesHolder = () => {
    const breakpointColumnsObj = {
        default: 4,
        1024: 3,
        768: 2,
        500: 1,
    };

    const { notes, createNote, updateTitle, updateContent, removeNote } = useNotes();
    const [activeNote, setActiveNote] = useState<NotesActivity>(null);

    const isAdderDisabled = () => {
        return activeNote !== null;
    }
    const handleActivityRequest = (req: NotesActivity) => {
        if (activeNote === null) 
        {
            setActiveNote(req); 
            return;
        }
        switch(activeNote.type){
            case "content":
                break;
            case "title":
                break;
            default:
                if(!activeNote.type){
                    console.error("Type is not present"); 
                    break;
                }
                console.error(`Unhandled type: ${activeNote.type}`);
                break;
        }
    }

    async function onTitleSubmit  (id: number, title: string)  {
        setActiveNote({id, type:"content"});
        await updateTitle(id, title);
    };

    async function onNoteRemove(id: number) {
        setActiveNote(null);
        await removeNote(id);
    }
    const onNoteSubmit = async (id:number,content: string) =>{
        setActiveNote(null);
        await updateContent(id,content);
    }
    async function onAddNote() {
        const newNoteId = await createNote();
        if(!newNoteId) return;
        setActiveNote({ id: newNoteId, type:"title" });
    }

    return (
        <div className="mt-2">
            <NoteAdder notes={notes} onAddNote={onAddNote} disabled={isAdderDisabled()} />
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex gap-4"
                columnClassName="flex flex-col gap-4"
            >
                {notes.map((note, index) => (
                    <div key={index} className="break-inside-avoid mb-4 fade-in">
                        <Note
                            key={note.id}
                            data={note}
                            activity={activeNote}
                            onNoteDelete={onNoteRemove}
                            onTitleSubmit={onTitleSubmit}
                            onNoteSubmit={onNoteSubmit}
                            onActivityUpdate={handleActivityRequest}
                        />
                    </div>
                ))}
            </Masonry>
        </div>
    );
}

export default NotesHolder;
