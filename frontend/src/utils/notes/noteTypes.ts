export interface NoteData {
    id: number;
    title: string;
    content: string;
}

export type NotesActivity =
    | {
        id: number, type: "title" | "content", value: string
    }
    | null;
;
export interface useNoteManagerResult {
    notes: NoteData[];
    activeNote: NotesActivity;
    isAdderDisabled: () => boolean;
    onAddNote: () => Promise<void>;
    onTitleSubmit: (id: number, title: string) => Promise<void>;
    onNoteSubmit: (id: number, content: string) => Promise<void>;
    onNoteRemove: (id: number) => Promise<void>;
    onActivityUpdate: (activity: NotesActivity) => Promise<void>;
    onFocusNext: (id: number) => void;
    isBodyActive: (note: NoteData) => boolean;
    isTitleActive: (note: NoteData) => boolean;
    requestBodyActivity: (wantsActive: boolean, value: string, note: NoteData) => Promise<void>
    requestTitleActivity: (wantsActive: boolean, value: string, note: NoteData) => Promise<void>;
} 