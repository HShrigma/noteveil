export const MAIN_STATES = {
    TASK_DISPLAY: 'taskDisplay',
    NOTES_DISPLAY: 'notesDisplay',
    PROJECTS_DISPLAY: 'projectsDisplay'
} as const;
export interface ProjectData{
    id: number;
    title: string;
    taskCount: number;
    noteCount: number;
};
export type ProjectActivity = { id: number | null };
const getDiscardMsg = (toWhat: string) => {return `Discard changes to this ${toWhat}?`};
export const discardMsgNoteTitle = getDiscardMsg("Note Title");
export const discardMsgNoteContent = getDiscardMsg("Note Content");
export const discardMsgTaskBottomBar = getDiscardMsg("Task Adder");
export const discardMsgTaskAdder = getDiscardMsg("Task List Adder");
export const discardMsgTask = getDiscardMsg("Task");
export const discardMsgTaskTitle = getDiscardMsg("Task Title");
export const discardMsgProjectTitle = getDiscardMsg("Project Title");

export type MainState = typeof MAIN_STATES[keyof typeof MAIN_STATES];