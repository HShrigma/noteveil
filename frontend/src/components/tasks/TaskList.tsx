import { TaskActivity } from "../../utils/registries";
import EditableTitle from "../shared/EditableTitle";
import GoesToButton from "./GoesToButton";
import Task, { type TaskItem } from "./Task";
import TaskBottomBar from "./TaskBottomBar";

export interface TaskListData{
    id: number;
    title: string;
    tasks: TaskItem[];
    nextId?: number;
}
interface TaskListProps {
    activeTask: TaskActivity;
    allTasks: TaskListData[]
    focusTargetTask: "label" | null;
    onTaskFocus: (listId: number, taskId: number, active: boolean) => void;
    clearTaskFocus: () => void;
    data: TaskListData;
    onTaskSubmit?: (id: number, taskId: number, label: string) => void;
    onTaskDoneChanged?: (id: number, taskId: number, done: boolean) => void;
    onTaskAdded?: (id: number, label: string) => void;
    onTaskRemoved?: (id: number, taskId: number) => void;
    onTitleEdited?: (id: number, label: string) => void;
    onTitleSubmitted?: (id:number) => void;
    onDeleted?: (id:number) => void;
    onGoesTo?: (id:number, nextId:number) => void;
};

export const TaskList = ({ activeTask, allTasks, focusTargetTask, clearTaskFocus, onTaskFocus, data, onTaskSubmit, onTaskDoneChanged, onTaskAdded, onTaskRemoved, onTitleEdited, onTitleSubmitted, onDeleted, onGoesTo }: TaskListProps) => {
    const handleDoneChanged = (id: number, done:boolean) => {
        onTaskDoneChanged?.(data.id, id, done);
    };
    const isTaskActive = (taskId: number) => activeTask.listId === data.id && activeTask.taskId === taskId && activeTask.active;
    const onFocusChanged = (id:number, active: boolean) => {
        onTaskFocus(data.id, id, active);
        if(!active) clearTaskFocus();
    }
    const handleSubmit = (id: number, label: string ) => {
        onTaskSubmit?.(data.id, id, label);
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

    const onDelete = () => {
        onDeleted?.(data.id) ;
    };

    const handleOnGoesTo = (nextId: number) => {
        onGoesTo?.(data.id, nextId);
    }
    return (
        <>
            <EditableTitle 
                id={data.id} title={data.title} 
                onEdit={onTitleEdit}
                onSubmit={onTitleSubmit}
            />
            <GoesToButton 
                ownId={data.id}
                items={allTasks}
                onGoesTo={handleOnGoesTo}
            />
            <div className="flex flex-col gap-2 mt-2">
            {data.tasks && (data.tasks.map(task =>
                <Task
                    key={task.id}
                    isActive={isTaskActive(task.id)}
                    focusTarget={isTaskActive(task.id) ? focusTargetTask : null}
                    onFocusChange={(active) => onFocusChanged(task.id,active)}
                    task={task}
                    onSubmit={handleSubmit}
                    onDoneChange={handleDoneChanged}
                    onDelete={removeTask}
                />))}
            </div>
            <TaskBottomBar onAdded={addNewTask} onDelete={onDelete}/>
        </>
    );
};

export default TaskList;