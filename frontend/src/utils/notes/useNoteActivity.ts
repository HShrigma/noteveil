import { useState } from "react";
import { NoteData, NotesActivity } from "./noteTypes";
import { discardMsgNoteContent, discardMsgNoteTitle } from "../registries";
import { getIndex } from "./noteHelpers";

export const useNoteActivity = () => {
    const [activeNote, setActiveNote] = useState<NotesActivity>(null);
    const isAdderDisabled = () => {
        return activeNote !== null;
    }
    const confirmDiscardIfDirty = async (notes: NoteData[], reqtype: string): Promise<boolean> => {
        if (activeNote === null) return true;

        const { id, type, value } = activeNote;
        const idx = getIndex(id, notes);
        if (idx === -1) return true;

        const currentValue = notes[idx][type];

        if (value.trim() === currentValue.trim()) {
            return true;
        }
        const msg = activeNote.type === "title" ? discardMsgNoteTitle : discardMsgNoteContent;
        return window.confirm(msg);
    };
    const handleActivityRequest = async (notes: NoteData[], req: NotesActivity) => {
        if (activeNote === null || req === null) {
            setActiveNote(req);
            return;
        }

        // Same activity - allow
        if (req.id === activeNote.id && req.type === activeNote.type) {
            setActiveNote(req);
            return;
        }

        // Ask user
        const canLeave = await confirmDiscardIfDirty(notes, req.type);
        if (!canLeave) return;

        setActiveNote(req);
    };

    const setAddNoteActivity = (id: number) => setActiveNote({ id: id, type: "title", value: "New Note" });
    const setTitleSubmitActivity = (id: number, value: string) => setActiveNote({ id, type: "content", value });
    const setNoActivity = () => setActiveNote(null);
    const setNextActive = (notes: NoteData[], id: number) =>{
        let nextIndex = getIndex(id, notes);
        if (nextIndex === -1) {
            console.error(`could not find index for id: ${id}`);
            return;
        }
        nextIndex++;
        nextIndex %= notes.length;
        const newNote = notes[nextIndex];
        setActiveNote({ id: newNote.id, type: "content", value: newNote.content });
    }
    const isActive = (typeLabel: string, note: NoteData) => {
        if (activeNote === null) return false;
        return activeNote && (activeNote.type === typeLabel && activeNote.id === note.id)
    }
    const isBodyActive = (note: NoteData) => { return  isActive("content", note)};
    const isTitleActive = (note: NoteData) => { return isActive("title", note)};

    return { activeNote, isAdderDisabled, confirmDiscardIfDirty, handleActivityRequest, setTitleSubmitActivity, setNoActivity, setAddNoteActivity, setNextActive, isBodyActive, isTitleActive};
}