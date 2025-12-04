import EditableTitle from "../shared/EditableTitle";
import GoesToButton from "./GoesToButton";
import Task, { type TaskItem } from "./Task";
import TaskBottomBar from "./TaskBottomBar";

export interface TaskListData{
    id: number;
    title: string;
    tasks: TaskItem[];
    nextId?: number;
    goToLabel?: string;
}
interface TaskListProps {
    allTasks: TaskListData[];
    data: TaskListData;
    onTaskLabelChanged?: (id: number, taskId: number, label: string) => void;
    onTaskDoneChanged?: (id: number, taskId: number, done: boolean) => void;
    onTaskAdded?: (id: number, label: string) => void;
    onTaskRemoved?: (id: number, taskId: number) => void;
    onTitleEdited?: (id: number, label: string) => void;
    onTitleSubmitted?: (id:number) => void;
    onDeleted?: (id:number) => void;
    onGoesTo?: (id:number, nextId:number) => void;
};

export const TaskList = ({ allTasks, data, onTaskLabelChanged, onTaskDoneChanged, onTaskAdded, onTaskRemoved, onTitleEdited, onTitleSubmitted, onDeleted, onGoesTo }: TaskListProps) => {
    const handleDoneChange = (id: number, done:boolean) => {
        onTaskDoneChanged?.(data.id, id, done);
    };
    const handleLabelChange = (id: number, label: string ) => {
        onTaskLabelChanged?.(data.id, id, label);
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
                label={data.goToLabel ?? "None"}
                ownId={data.id}
                items={allTasks}
                onGoesTo={handleOnGoesTo}
            />
            <div className="flex flex-col gap-2 mt-2">
            {data.tasks && (data.tasks.map(task =>
                <Task
                    key={task.id}
                    task={task}
                    onLabelChange={handleLabelChange}
                    onDoneChange={handleDoneChange}
                    onDelete={removeTask}
                />))}
            </div>
            <TaskBottomBar onAdded={addNewTask} onDelete={onDelete}/>
        </>
    );
};

export default TaskList;