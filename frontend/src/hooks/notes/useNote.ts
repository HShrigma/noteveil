import { useEffect, useState } from "react"
import { addNote, deleteNote, fetchNotes, patchNoteContent, patchNoteTitle } from "../../api/notesApi";
import { NoteData } from "../../types/noteTypes";
import { useProjectsContext } from "../../context/projects/projectsContext";
import { getIndex } from "./noteHelpers";
import { createTempId } from "../../utils/mathUtils";
import { useUserContext } from "../../context/users/userContext";

export const useNotes = ( activeProjectId: number | null) => {
    const userCtx = useUserContext();
    const [notes, setNotes] = useState<NoteData[]>([]);

    const { refreshProjects } = useProjectsContext();
    useEffect(() => { if(activeProjectId !== null) fetchNotes(activeProjectId).then(fetched => { 
        if(fetched.error){
            userCtx.authLogout();
            return;
        }
        setNotes(fetched);
    });
    }, []);

    const updateTitle = async (id: number, title: string) => {
        const index = getIndex(id, notes);
        if (index === -1) return;
        const prevTitle = notes[index].title;
        setNotes(prev => prev.map(note => note.id === id ? { ...note, title: title } : note));
        const res = await patchNoteTitle(id, title);
        if(res.error){
            setNotes(prev => prev.map(note => note.id === id ? { ...note, title: prevTitle } : note));
            userCtx.authLogout();
        }
    };

    const updateContent = async (id: number, content: string) => {
        const index = getIndex(id, notes);
        if (index === -1) return;
        const prevContent = notes[index].content;
        setNotes(prev => prev.map(note => note.id === id ? { ...note, content: content } : note));
        const res =await patchNoteContent(id, content);
        if(res.error){
            setNotes(prev => prev.map(note => note.id === id ? { ...note, content: prevContent } : note));
            userCtx.authLogout();
        }
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
        if (res.error) {
            setNotes(prev => prev.filter(n => n.id !== tempId))
            userCtx.authLogout();
            return;
        }

        const realId = Number(res.body.id);
        setNotes(prev => prev.map(n => n.id === tempId ? { ...n, id: realId } : n))
        await refreshProjects();
        return realId;
    };

    const removeNote = async (id: number) => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
        const res = await deleteNote(id);
        if (res.error) {
            userCtx.authLogout();
            return;
        }
        await refreshProjects();
    };

    return { notes, createNote, updateTitle, updateContent, addNote, removeNote }
}