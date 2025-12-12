export interface Task{
    id: number;
    label: string;
    done: boolean;
}

export interface RawJoinTaskList{
    list_id: number;
    list_title: string;
    next_id: number | null;
    task_id: number | null;
    task_label: string | null;
    task_done: number | null;
}
export interface TaskList{
    id: number,
    title: string,
    tasks: Task[],
    nextId: number | undefined
}