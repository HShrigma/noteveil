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
    { id: 0, label: "sample Task", done: false },
    { id: 1, label: "do Thing", done: false },
    { id: 2, label: "complete Thing", done: false },
];
export const sampleTasksAlt: Task[] = [
    { id: 3, label: "sample Task", done: false },
    { id: 4, label: "do Thing", done: false },
    { id: 5, label: "complete Thing", done: false },
];
export const tempTasks: TaskList[] = [
    { id: 1, title: "tasks from API", tasks: [...sampleTasks], nextId: undefined },
    { id: 2, title: "tasks 2", tasks: [...sampleTasksAlt], nextId: undefined }
];

