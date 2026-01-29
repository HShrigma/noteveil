import type { NoteData, NotesActivity } from "../../types/noteTypes";
import { useNotes } from "./useNote";
import { useNoteActivity } from "./useNoteActivity";

export const useNotesManager = ( activeProjectId: number | null) => {
    const notesHook = useNotes(activeProjectId);
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
    const isBodyActive = (note: NoteData) => activityHook.isBodyActive(note);
    const isTitleActive = (note: NoteData) => activityHook.isTitleActive(note);

    const requestActivity = (wantsActive: boolean, type: "title" | "content", value: string, note: NoteData) => activityHook.handleActivityRequest(notes, wantsActive ? { id: note.id, type: type, value: value } : null);
    const requestBodyActivity = (wantsActive: boolean, value: string, note: NoteData) => requestActivity(wantsActive,"content",value, note);
    const requestTitleActivity = (wantsActive: boolean, value: string, note: NoteData) => requestActivity(wantsActive, "title", value, note); 
    return {
        notes,
        activeProjectId,
        activeNote,
        isAdderDisabled,
        onAddNote,
        onTitleSubmit,
        onNoteSubmit,
        onNoteRemove,
        onActivityUpdate,
        onFocusNext,
        isBodyActive,
        isTitleActive,
        requestBodyActivity,
        requestTitleActivity
    };
};
