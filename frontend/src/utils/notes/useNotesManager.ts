import { NotesActivity } from "./noteTypes";
import { useNotes } from "./useNote";
import { useNoteActivity } from "./useNoteActivity";

export const useNotesManager = () => {
  const notesHook = useNotes();
  const activityHook = useNoteActivity();

  const { notes, createNote, updateTitle, updateContent, removeNote } = notesHook;
  const { activeNote, isAdderDisabled, handleActivityRequest, setTitleSubmitActivity, setNoActivity, setAddNoteActivity, setNextActive } = activityHook;

  const onAddNote = async () => {
    const id = await createNote();
    if (!id) return;
    setAddNoteActivity(id);
  };

  const onTitleSubmit = async (id: number, title: string) => {
    setTitleSubmitActivity(id, title);
    await updateTitle(id, title);
  };

  const onNoteSubmit = async (id: number, content: string) => {
    setNoActivity();
    await updateContent(id, content);
  };

  const onNoteRemove = async (id: number) => {
    setNoActivity();
    await removeNote(id);
  };

  const onActivityUpdate = (activity: NotesActivity) => handleActivityRequest(notes, activity);
  const onFocusNext = (id: number) => setNextActive(notes, id);

  return {
    notes,
    activeNote,
    isAdderDisabled,
    onAddNote,
    onTitleSubmit,
    onNoteSubmit,
    onNoteRemove,
    onActivityUpdate,
    onFocusNext
  };
};
