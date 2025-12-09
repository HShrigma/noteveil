export interface NoteData {
    id: number;
    title: string;
    content: string;
}

export interface TaskItem {
  id: number;
  label: string;
  done: boolean;
}

export interface TaskListData {
    id: number;
    title: string;
    tasks: TaskItem[];
    nextId?: number;
}