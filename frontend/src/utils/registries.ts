export const MAIN_STATES = {
    TASK_DISPLAY: 'taskDisplay',
    NOTES_DISPLAY: 'notesDisplay',
} as const;

export const discardMsgNoteTitle = "Discard changes to this Note Title?";
export const discardMsgNoteContent = "Discard changes to this Note Content?";
export const discardMsgTaskBottomBar = "Discard changes to this Task Adder?";
export const discardMsgTaskAdder = "Discard changes to this Task List Adder?";
export const discardMsgTask = "Discard changes to this Task?";
export const discardMsgTaskTitle = "Discard changes to this Task Title?";

export type MainState = typeof MAIN_STATES[keyof typeof MAIN_STATES];