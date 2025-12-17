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

export type TaskActivity = 
    | { type: "task", listId: number, taskId: number, value: string } 
    | { type: "title" ,listId: number,  value: string} 
    | { type: "adder" , value: string} 
    | { type: "bottomBar", listId: number, value: string } 
    | { type: "goesTo", listId: number } 
    | null;
    
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
