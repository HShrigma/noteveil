import type { ReactNode } from "react";
import { NoteManagerContext } from "./noteManagerContext";
import { useNotesManager } from "../../hooks/notes/useNotesManager";

export const NoteProvider = ({ children, activeProjectId }: { children: ReactNode, activeProjectId: number | null }) => {
  const manager = useNotesManager(activeProjectId);
  return (
    <NoteManagerContext.Provider value={manager}>
      {children}
    </NoteManagerContext.Provider>
  );
};
