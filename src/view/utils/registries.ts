export const MAIN_STATES = {
    TASK_DISPLAY: 'taskDisplay',
    NOTES_DISPLAY: 'notesDisplay',
} as const;

export const NoteBlockSeparator = '\n\n';

export type MainState = typeof MAIN_STATES[keyof typeof MAIN_STATES];