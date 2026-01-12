import { useEffect, useState } from "react"
import { addNote, deleteNote, fetchNotes, patchNoteContent, patchNoteTitle } from "../../api/notesApi";
import { NoteData } from "../../types/noteTypes";
import { useProjectsContext } from "../../context/projects/projectsContext";
import { getIndex } from "./noteHelpers";
import { createTempId } from "../../utils/mathUtils";

export const useNotes = ( activeProjectId: number | null) => {
    const [notes, setNotes] = useState<NoteData[]>([]);

    const { refreshProjects } = useProjectsContext();
    useEffect(() => { if(activeProjectId !== null) fetchNotes(activeProjectId).then(fetched => { setNotes(fetched); }); }, []);

    const updateTitle = async (id: number, title: string) => {
        setNotes(prev => {
            const idx = getIndex(id, prev);
            if (idx === -1) return prev;
            const copy = [...prev];
            copy[idx] = { ...copy[idx], title };
            return copy;
        });
        await patchNoteTitle(id, title);
    };

    const updateContent = async (id: number, content: string) => {
        setNotes((prev) => {
            const copy = [...prev];
            copy[getIndex(id, notes)].content = content;
            return copy;
        });
        await patchNoteContent(id, content);
    };

    const createNote = async () => {
        if(activeProjectId === null) return;
        const tempId = createTempId();
        const note: NoteData = {
            id: tempId,
            title: "New Note",
            content: ""
        };

        setNotes(prev => [...prev, note]);
        const res = await addNote(activeProjectId);
        const realId = Number(res.body.id);

        if (!res.success) {
            setNotes(prev => prev.filter(n => n.id !== tempId))
            return;
        }

        setNotes(prev => prev.map(n => n.id === tempId ? { ...n, id: realId } : n))
        await refreshProjects();
        return realId;
    };

    const removeNote = async (id: number) => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
        await deleteNote(id);
        await refreshProjects();
    };

    return { notes, createNote, updateTitle, updateContent, addNote, removeNote }
}