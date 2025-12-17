import TaskList from "./TaskList";
import Masonry from "react-masonry-css";
import { triggerScreenBob, triggerScreenShake } from "../../../utils/screenShake";
import TaskListAdder from "./compositional/TaskListAdder";
import { useTasksContext } from "../../../utils/tasks/taskContext";
import { useState } from "react";
import { TaskActivity } from "../../../utils/tasks/taskTypes";
import ActiveTask from "./ActiveTask";

export const TasksHolder = () => {
    const [activeTask, setActiveTask] = useState<TaskActivity>(null);
    const breakpointColumnsObj = {
        default: 4,
        1024: 3,
        768: 2,
        500: 1,
    };
    const res = useTasksContext();

    const requestActivity = (activity: TaskActivity) => {
        setActiveTask(activity);
    }

    return (
        <div>
            <TaskListAdder 
                isActive={activeTask?.type === "adder"}
                onTaskListAdded={(title) => { res.createList(title); triggerScreenBob(); }} 
                onRequestActive={(wantsActive) => { requestActivity(wantsActive ? { type: "adder" } : null) }} />
            <Masonry breakpointCols={breakpointColumnsObj} className="flex gap-4" columnClassName="flex flex-col gap-4">
                {res.tasks.map((list) => (
                    <section className="bg-[#1f2335] p-5 rounded-md shadow-md shadow-black/30 border border-[#2a2f47] fade-in" key={list.id}>
                        <TaskList
                            allTasks={res.tasks}
                            goesToLabel={res.getGoesTo(list.nextId)}
                            activeTask={activeTask}
                            onActivityRequest={requestActivity}
                            data={list}
                            onTaskSubmit={res.updateTaskLabel}
                            onTaskDoneChanged={res.updateTaskDone}
                            onTaskAdded={(id,label)=>{res.createTask(id,label); triggerScreenBob(150);}}
                            onTaskRemoved={res.removeTask}
                            onTitleSubmitted={(id, title) => { res.updateTitle(id,title); triggerScreenBob(200); }}
                            onDeleted={(id) => {res.removeList(id); triggerScreenShake();}}
                            onGoesTo={res.updateGoesTo}
                        />
                    </section>
                ))}
            </Masonry>
        </div>
    );
};

export default TasksHolder;