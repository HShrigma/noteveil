import { createContext, useContext } from "react";
import { useNoteManagerResult } from "../../types/noteTypes";

export const NoteManagerContext = createContext<useNoteManagerResult | null>(null);

export const useNoteManagerContext = () => {
  const ctx = useContext(NoteManagerContext);
  if (!ctx) throw new Error("Must be used inside TaskManagerProvider");
  return ctx;
};

