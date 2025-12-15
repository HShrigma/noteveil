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

export interface UseTaskResult {
    tasks: TaskListData[];

    updateTaskDone: (
        listId: number,
        taskId: number,
        done: boolean
    ) => Promise<void>;

    updateTaskLabel: (
        listId: number,
        taskId: number,
        label: string
    ) => Promise<void>;

    createTask: (
        listId: number,
        label: string
    ) => Promise<void>;

    removeTask: (
        listId: number,
        taskId: number
    ) => Promise<void>;

    removeList: (listId: number) => Promise<void>;

    updateTitle: (
        listId: number,
        value: string
    ) => Promise<void>;

    createList: (title: string) => Promise<void>;

    updateGoesTo: (
        listId: number,
        nextId: number
    ) => Promise<void>;

    getGoesTo: (
        listId: number | undefined
    ) => string;
}
