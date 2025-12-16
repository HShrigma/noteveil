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
        return window.confirm(reqtype === "title" ? discardMsgNoteTitle : discardMsgNoteContent);
    };
    const handleActivityRequest = async (notes: NoteData[], req: NotesActivity) => {
        console.log("handling req");

        console.log(`req data: ${req === null ? " req is null" : req}`);

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

    return { activeNote, isAdderDisabled, confirmDiscardIfDirty, handleActivityRequest, setTitleSubmitActivity, setNoActivity, setAddNoteActivity };
}