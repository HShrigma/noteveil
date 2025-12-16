import { NoteData } from "./noteTypes";
export const getIndex = (id: number, notes: NoteData[]) => notes.findIndex(t => t.id === id);