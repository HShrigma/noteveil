import TaskList from "./TaskList";
import Masonry from "react-masonry-css";
import { triggerScreenBob, triggerScreenShake } from "../../../utils/screenShake";
import TaskListAdder from "./compositional/TaskListAdder";
import { useTaskManagerContext } from "../../../utils/tasks/taskManagerContext";
import { useTaskActivity } from "../../../utils/tasks/useTaskActivity";

export const TasksHolder = () => {
    const breakpointColumnsObj = {
        default: 4,
        1024: 3,
        768: 2,
        500: 1,
    };
    const ctx = useTaskManagerContext();
    const { activeTask, requestActivity } = useTaskActivity(ctx.tasks);
    return (
        <div>
            <TaskListAdder
                isActive={activeTask?.type === "adder"}
                onTaskListAdded={(title) => { ctx.createList(title); triggerScreenBob(); }}
                onActivityRequest={(wantsActive, value) => { requestActivity(wantsActive ? { type: "adder", value: value ?? "" } : null) }} />
            <Masonry breakpointCols={breakpointColumnsObj} className="flex gap-4" columnClassName="flex flex-col gap-4">
                {ctx.tasks.map((list) => (
                    <section className="bg-[#1f2335] p-5 rounded-md shadow-md shadow-black/30 border border-[#2a2f47] fade-in" key={list.id}>
                        <TaskList
                            allTasks={ctx.tasks}
                            goesToLabel={ctx.getGoesTo(list.nextId)}
                            activeTask={activeTask}
                            onActivityRequest={requestActivity}
                            data={list}
                            onTaskSubmit={ctx.updateTaskLabel}
                            onTaskDoneChanged={ctx.updateTaskDone}
                            onTaskAdded={(id, label) => { ctx.createTask(id, label); triggerScreenBob(150); }}
                            onTaskRemoved={ctx.removeTask}
                            onTitleSubmitted={(id, title) => { ctx.updateTitle(id, title); triggerScreenBob(200); }}
                            onDeleted={(id) => { ctx.removeList(id); triggerScreenShake(); }}
                            onGoesTo={ctx.updateGoesTo}
                        />
                    </section>
                ))}
            </Masonry>
        </div>
    );
};

export default TasksHolder;