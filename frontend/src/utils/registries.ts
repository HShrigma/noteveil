export const MAIN_STATES = {
    TASK_DISPLAY: 'taskDisplay',
    NOTES_DISPLAY: 'notesDisplay',
} as const;

export const discardMsgNoteTitle = "Discard changes to this Note Title?";
export const discardMsgNoteContent = "Discard changes to this Note Content?";

export type TaskActivity = {
    listId: number,
    taskId: number,
    active: boolean
}

export type MainState = typeof MAIN_STATES[keyof typeof MAIN_STATES];