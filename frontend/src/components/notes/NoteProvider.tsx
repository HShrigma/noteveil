import { ReactNode } from "react";
import { useNotesManager } from "../../utils/notes/useNotesManager";
import { NoteManagerContext } from "../../utils/notes/noteManagerContext";

export const NoteProvider = ({ children, activeProjectId }: { children: ReactNode, activeProjectId: number | null }) => {
  const manager = useNotesManager(activeProjectId);
  return (
    <NoteManagerContext.Provider value={manager}>
      {children}
    </NoteManagerContext.Provider>
  );
};
