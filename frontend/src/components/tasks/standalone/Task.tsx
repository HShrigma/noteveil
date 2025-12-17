import ActiveTask from "./ActiveTask";
import InactiveTask from "./InactiveTask";
import { TaskItem } from "../../../utils/tasks/taskTypes";

interface TaskProps {
    task: TaskItem;
    isActive: boolean;
    onActivityRequest: (wantsActive: boolean, value?: string) => void;
    onSubmit?: (id: number, label: string) => void;
    onDoneChange?: (id: number, done: boolean) => void;
    onDelete: (id: number) => void;
}

const Task = ({ task, isActive, onSubmit, onDoneChange, onDelete, onActivityRequest }: TaskProps) => {
    return isActive ? (
        <ActiveTask
            taskId={task.id}
            label={task.label}
            done={task.done}
            onChanged={(value) => onActivityRequest(true, value)}
            onSubmit={(id, label) => { onSubmit?.(id, label); onActivityRequest(false); }}
            onCancel={() => onActivityRequest(false)}
        />
    ) : (
        <InactiveTask
            taskId={task.id}
            label={task.label}
            done={task.done}
            onActivate={() => onActivityRequest(true, task.label)}
            onDoneChange={onDoneChange}
            onDelete={onDelete}
        />
    );
};

export default Task;