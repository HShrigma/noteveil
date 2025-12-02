import EditableTitle from "../shared/EditableTitle";
import Task, { type TaskItem } from "./Task";
import TaskAdder from "./TaskAdder";

export interface TaskListData{
    id: number;
    title: string;
    tasks: TaskItem[];
    nextId?: number;
}
interface TaskListProps {
    data: TaskListData;
    onTaskChanged?: (id: number, label: string, completed: boolean) => void;
    onTaskAdded?: (id: number, label: string) => void;
    onTaskRemoved?: (id: number, taskId: number) => void;
    onTitleEdited?: (id: number, label: string) => void;
    onTitleSubmitted?: (id:number) => void;
};

export const TaskList = ({ data, onTaskChanged, onTaskAdded, onTaskRemoved, onTitleEdited, onTitleSubmitted}: TaskListProps) => {
    const handleStatusChange = (id: number, label: string, completed: boolean) => {
        onTaskChanged?.(id, label, completed);
    };
    const removeTask = (taskId: number) => {
        onTaskRemoved?.(data.id, taskId);
    };
    const addNewTask = (label: string) => {
        onTaskAdded?.(data.id, label);
    };

    const onTitleEdit = (index: number, newValue: string) => {
        onTitleEdited?.(index, newValue);
    };

    const onTitleSubmit = (index: number) => {
        onTitleSubmitted?.(index);
    };

    return (
        <>
            <EditableTitle 
                id={data.id} title={data.title} 
                onEdit={onTitleEdit}
                onSubmit={onTitleSubmit}
            />
            <div className="flex flex-col gap-2 mt-2">
            {data.tasks.map(task =>
                <Task
                    key={task.id}
                    task={task}
                    onStatusChange={handleStatusChange}
                    onDelete={removeTask}
                />)}
            </div>
            <div className="mt-4">
                <TaskAdder onTaskAdded={addNewTask} />
            </div>
        </>
    );
};

export default TaskList;