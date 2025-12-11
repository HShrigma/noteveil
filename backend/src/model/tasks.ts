export interface Task{
    id: number;
    label: string;
    done: boolean;
}

export interface TaskList{
    id: number,
    title: string,
    tasks: Task[],
    nextId: number | undefined
}

export const sampleTasks: Task[] = [
    { id: 1, label: "sample Task", done: false },
    { id: 2, label: "do Thing", done: false },
    { id: 3, label: "complete Thing", done: false },
];
export const sampleTasksAlt: Task[] = [
    { id: 4, label: "sample Task", done: false },
    { id: 5, label: "do Thing", done: false },
    { id: 6, label: "complete Thing", done: false },
];
export const tempTasks: TaskList[] = [
    { id: 2, title: "tasks from API", tasks: [...sampleTasks], nextId: undefined },
    { id: 3, title: "tasks 2", tasks: [...sampleTasksAlt], nextId: undefined }
];

