import EditableTitle from "../../shared/title/EditableTitle";
import GoesToButton from "./compositional/GoesToButton";
import Task  from "./Task";
import TaskBottomBar from "./compositional/TaskBottomBar";
import { TaskActivity, TaskListData } from "../../../utils/tasks/taskTypes";

interface TaskListProps {
    allTasks: TaskListData[];
    goesToLabel: string;
    data: TaskListData;
    activeTask: TaskActivity;
    onActivityRequest: (activity: TaskActivity) => void;
    onTaskSubmit?: (listId: number, taskId: number, label: string) => void;
    onTaskDoneChanged?: (listId: number, taskId: number, done: boolean) => void;
    onTaskAdded?: (listId: number, label: string) => void;
    onTaskRemoved?: (listId: number, taskId: number) => void;
    onTitleSubmitted?: (id: number, title: string) => void;
    onDeleted?: (id: number) => void;
    onGoesTo?: (id: number, nextId: number) => void;
}

export const TaskList = ({
    allTasks,
    goesToLabel,
    data,
    activeTask,
    onActivityRequest,
    onTaskSubmit,
    onTaskDoneChanged,
    onTaskAdded,
    onTaskRemoved,
    onTitleSubmitted,
    onDeleted,
    onGoesTo,
}: TaskListProps) => {
    return (
        <>
            <EditableTitle
                title={data.title}
                onSubmit={(value) => onTitleSubmitted?.(data.id,value)}
            />
            <GoesToButton  ownId={data.id} label={goesToLabel} items={allTasks} onGoesTo={(goesToId) => onGoesTo?.(data.id, goesToId)} />
            <div className="flex flex-col gap-2 mt-2">
                {data.tasks &&
                    data.tasks.map((task) => (
                        <Task
                            key={task.id}
                            task={task}
                            isActive={activeTask?.listId === data.id && activeTask?.taskId === task.id}
                            onRequestActive={(active) => onActivityRequest(active ? { taskId: task.id, listId: data.id } : null)}
                            onSubmit={(taskId, label) => onTaskSubmit?.(data.id, taskId, label)}
                            onDoneChange={(taskId, done) => onTaskDoneChanged?.(data.id, taskId, done)}
                            onDelete={(taskId) => onTaskRemoved?.(data.id, taskId)}
                        />
                    ))}
            </div>
            <TaskBottomBar onAdded={(label) => onTaskAdded?.(data.id, label)} onDelete={() => onDeleted?.(data.id)} />
        </>
    );
};

export default TaskList;
