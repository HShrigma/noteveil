import { useEffect, useState } from "react"
import { NoteData } from "./noteTypes"
import { addNote, deleteNote, fetchNotes, patchNoteContent, patchNoteTitle } from "../../api/notesApi";
import { createTempId } from "../mathUtils";

export const useNotes = () => {
    const [notes, setNotes] = useState<NoteData[]>([]);

    useEffect(() => { fetchNotes().then(fetched => { setNotes(fetched); }); }, []);

    const getIndex = (id: number) => notes.findIndex(t => t.id === id);

    const updateTitle = async (id: number, title: string) => {
        setNotes((prev) => {
            const copy = [...prev];
            copy[getIndex(id)].title = title;
            return copy;
        });
        await patchNoteTitle(id, title);
    };

    const updateContent = async (id: number, content: string) => {
        setNotes((prev) => {
            const copy = [...prev];
            copy[getIndex(id)].content = content;
            return copy;
        });
        await patchNoteContent(id, content);
    };

    const createNote = async () => {
        const tempId = createTempId();
        const note: NoteData = {
            id: tempId,
            title: "New Note",
            content: ""
        };

        setNotes(prev => [...prev, note]);
        const res = await addNote();
        const realId = Number(res.body.id);

        if(!res.success){
            setNotes(prev => prev.filter(n => n.id !== tempId))
            return;
        }

        setNotes(prev => prev.map(n => n.id === tempId ? {...n, id: realId} : n))
        return realId;
    };

    const removeNote = async (id: number) => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
        await deleteNote(id);
    };

    return { notes, createNote, updateTitle, updateContent, addNote, removeNote }
}