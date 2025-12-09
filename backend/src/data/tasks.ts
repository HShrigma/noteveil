export const sampleTasks = [
    { id: 0, label: "sample Task", done: false },
    { id: 1, label: "do Thing", done: false },
    { id: 2, label: "complete Thing", done: false },
];
export const sampleTasksAlt = [
    { id: 3, label: "sample Task", done: false },
    { id: 4, label: "do Thing", done: false },
    { id: 5, label: "complete Thing", done: false },
];
export const tempTasks = [
    { id: 1, title: "tasks from API", tasks: [...sampleTasks], nextId: undefined },
    { id: 2, title: "tasks 2", tasks: [...sampleTasksAlt], nextId: undefined }
];
