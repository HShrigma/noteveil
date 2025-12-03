import { useState } from "react";
import EditableTitle from "../shared/EditableTitle";
import Task, { type TaskItem } from "./Task";
import TaskBottomBar from "./TaskBottomBar";

export interface TaskListData{
    id: number;
    title: string;
    tasks: TaskItem[];
    nextId?: number;
}
interface TaskListProps {
    data: TaskListData;
    onTaskChanged?: (id: number, taskId: number, label: string, completed: boolean) => void;
    onTaskAdded?: (id: number, newTaskId: number, label: string) => void;
    onTaskRemoved?: (id: number, taskId: number) => void;
    onTitleEdited?: (id: number, label: string) => void;
    onTitleSubmitted?: (id:number) => void;
    onDeleted?: (id:number) => void;
};

export const TaskList = ({ data, onTaskChanged, onTaskAdded, onTaskRemoved, onTitleEdited, onTitleSubmitted, onDeleted}: TaskListProps) => {
    const [maxId, setMaxId] = useState(data.tasks.length);
    const handleStatusChange = (id: number, label: string, completed: boolean) => {
        onTaskChanged?.(data.id, id, label, completed);
    };
    const removeTask = (taskId: number) => {
        onTaskRemoved?.(data.id, taskId);
    };
    const addNewTask = (label: string) => {
        onTaskAdded?.(data.id, maxId, label);
        setMaxId(prev => prev + 1);
    };

    const onTitleEdit = (index: number, newValue: string) => {
        onTitleEdited?.(index, newValue);
    };

    const onTitleSubmit = (index: number) => {
        onTitleSubmitted?.(index);
    };

    const onDelete = () => {
        onDeleted?.(data.id) ;
    };
    return (
        <>
            <EditableTitle 
                id={data.id} title={data.title} 
                onEdit={onTitleEdit}
                onSubmit={onTitleSubmit}
            />
            <div className="flex flex-col gap-2 mt-2">
            {data.tasks && (data.tasks.map(task =>
                <Task
                    key={task.id}
                    task={task}
                    onStatusChange={handleStatusChange}
                    onDelete={removeTask}
                />))}
            </div>
            <TaskBottomBar onAdded={addNewTask} onDelete={onDelete}/>
        </>
    );
};

export default TaskList;