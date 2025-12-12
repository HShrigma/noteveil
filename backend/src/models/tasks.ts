export interface Task{
    id: number;
    label: string;
    done: boolean;
}

export interface RawJoinTaskList{
    list_id: number;
    list_title: string;
    next_id: number;
    task_id: number;
    task_label: string;
    task_done: boolean;
}
export interface TaskList{
    id: number,
    title: string,
    tasks: Task[],
    nextId: number | undefined
}