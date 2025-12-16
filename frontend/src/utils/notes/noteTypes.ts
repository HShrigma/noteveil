export interface NoteData {
    id: number;
    title: string;
    content: string;
}

export type NotesActivity = 
    | {
        id: number, type: "title" | "content"
      }
    | null;
;