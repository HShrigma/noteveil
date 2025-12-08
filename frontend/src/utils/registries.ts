export const MAIN_STATES = {
    TASK_DISPLAY: 'taskDisplay',
    NOTES_DISPLAY: 'notesDisplay',
} as const;

export type NoteActivity = {
    id: number,
    active: boolean
};

export type MainState = typeof MAIN_STATES[keyof typeof MAIN_STATES];