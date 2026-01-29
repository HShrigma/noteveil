import EditableTitle from "../../shared/title/EditableTitle";
import GoesToButton from "../compositional/GoesToButton";
import Task  from "./Task";
import TaskBottomBar from "../compositional/TaskBottomBar";
import type { TaskListData } from "../../../types/taskTypes";
import { useTaskManagerContext } from "../../../context/tasks/taskManagerContext";
import { triggerScreenBob, triggerScreenShake } from "../../../utils/screenShake";
import { discardMsgTaskTitle } from "../../../utils/registries";

interface TaskListProps {
    goesToLabel: string;
    data: TaskListData;
    onTitleSubmitted?: (id: number, title: string) => void;
    onGoesTo?: (id: number, nextId: number) => void;
}

export const TaskList = ({
    goesToLabel,
    data,
    onTitleSubmitted,
    onGoesTo,
}: TaskListProps) => {
    const ctx = useTaskManagerContext();
    return (
        <>
            <EditableTitle
                title={data.title}
                discardMsg={discardMsgTaskTitle}
                isActive={ctx.active?.type === "title" && ctx.active.listId === data.id}
                onActivityRequest={(wantsActive, value) => wantsActive ? ctx.activateTitle(data.id, value) : ctx.clearActivity()}
                onSubmit={(value) => onTitleSubmitted?.(data.id,value)}
            />
            <GoesToButton  
                ownId={data.id}
                label={goesToLabel}
                items={ctx.tasks}
                isActive={ctx.active?.type === "goesTo" && ctx.active.listId === data.id}
                onActivityRequest={(wantsActive) => wantsActive ? ctx.activateGoesTo(data.id) : ctx.clearActivity()}
                onGoesTo={(goesToId) => onGoesTo?.(data.id, goesToId)} 

            />
            <div className="flex flex-col gap-2 mt-2">
                {data.tasks &&
                    data.tasks.map((task) => (
                        <Task
                            key={task.id}
                            task={task}
                            isActive={ctx.active?.type === "task" && ctx.active?.listId === data.id && ctx.active?.taskId === task.id}
                            onActivityRequest={(wantsActive, value) => wantsActive ? ctx.activateTask(data.id, task.id, value ?? "") : ctx.clearActivity()}
                            onSubmit={(taskId, label) => ctx.updateTaskLabel(data.id, taskId, label)}
                            onDoneChange={(taskId, done) => ctx.updateTaskDone(data.id, taskId, done)}
                            onDelete={(taskId) => ctx.removeTask(data.id, taskId)}
                        />
                    ))}
            </div>
            <TaskBottomBar 
                isActive={ctx.active?.type === 'bottomBar' && ctx.active.listId === data.id}
                onActivityRequest={(wantsActive, value) => wantsActive ? ctx.activateBottomBar(data.id, value ?? "") : ctx.clearActivity()}
                onAdded={(label) => { ctx.createTask(data.id, label); triggerScreenBob(150); }} 
                onDelete={() => { ctx.removeList(data.id); triggerScreenShake(); }}
            />
        </>
    );
};

export default TaskList;
