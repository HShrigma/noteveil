import type { NoteData } from "../../types/noteTypes";
export const getIndex = (id: number, notes: NoteData[]) => notes.findIndex(t => t.id === id);