import Task, { type TaskItem } from "./Task";

interface TasksProps {
    inputTasks: TaskItem[];
    onTaskChanged?: (id: number, label: string, completed: boolean) => void;
    onDelete: (id: number) => void;
};

export const Tasks = ({ inputTasks, onTaskChanged, onDelete}: TasksProps) => {
    // Task Status Changed Event Handler (Callback)
    const handleStatusChange = (id: number, label: string, completed: boolean) => {
        onTaskChanged?.(id, label, completed);
    };
    const handleDelete = (id: number) => {
        onDelete?.(id);
    };
    return (
        <>
            {inputTasks.map(task =>
                <Task
                    key={task.id}
                    task={task}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                />)}
        </>
    );
};

export default Tasks;