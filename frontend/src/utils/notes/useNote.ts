import { useEffect, useState } from "react"
import { NoteData } from "../types"
import { addNote, deleteNote, fetchNotes, patchNoteContent, patchNoteTitle } from "../../api/notesApi";

export const useNotes = () => {
    const [notes, setNotes] = useState<NoteData[]>([]);

    useEffect(() => {
        fetchNotes().then(fetched => {
            setNotes(fetched);
        });
    }, []);

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
        const res = await addNote();
        const id = Number(res.body.id);

        const note: NoteData = {
            id,
            title: "New Note",
            content: ""
        };

        setNotes((prev) => [...prev, note]);
        return id;
    };

    const removeNote = async (id: number) => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
        await deleteNote(id);
    };

    return { notes, createNote, updateTitle, updateContent, addNote, removeNote }
}