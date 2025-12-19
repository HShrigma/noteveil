import { ReactNode } from "react";
import { useNotesManager } from "../../utils/notes/useNotesManager";
import { NoteManagerContext } from "../../utils/notes/noteManagerContext";

export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const manager = useNotesManager();
  return (
    <NoteManagerContext.Provider value={manager}>
      {children}
    </NoteManagerContext.Provider>
  );
};
