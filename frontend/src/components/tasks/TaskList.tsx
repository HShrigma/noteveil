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
    const isTaskActive = (taskId: number) => activeTask.listId === data.id && activeTask.taskId === taskId && activeTask.active;
    const onFocusChanged = (id:number, active: boolean) => {
        onTaskFocus(data.id, id, active);
        if(!active) clearTaskFocus();
    }

    return (
        <>
            <EditableTitle 
                id={data.id} title={data.title} 
                onEdit={(index,newValue) => onTitleEdited?.(index, newValue)}
                onSubmit={(index) => onTitleSubmitted?.(index)}
            />
            <GoesToButton 
                ownId={data.id}
                items={allTasks}
                onGoesTo={(goesToId) => onGoesTo?.(data.id, goesToId)}
            />
            <div className="flex flex-col gap-2 mt-2">
            {data.tasks && (data.tasks.map(task =>
                <Task
                    key={task.id}
                    isActive={isTaskActive(task.id)}
                    focusTarget={isTaskActive(task.id) ? focusTargetTask : null}
                    onFocusChange={(active) => onFocusChanged(task.id,active)}
                    task={task}
                    onSubmit={(id, label) => onTaskSubmit?.(data.id, id, label)}
                    onDoneChange={(id, done) => onTaskDoneChanged?.(data.id, id, done)}
                    onDelete={(id) => onTaskRemoved?.(data.id, id)}
                />))}
            </div>
            <TaskBottomBar 
                onAdded={(label) => onTaskAdded?.(data.id, label)} 
                onDelete={() => onDeleted?.(data.id)} />
        </>
    );
};

export default TaskList;