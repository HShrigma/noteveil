import TaskList from "./TaskList";
import Masonry from "react-masonry-css";
import { triggerScreenBob, triggerScreenShake } from "../../../utils/screenShake";
import TaskListAdder from "./compositional/TaskListAdder";
import { useTasksContext } from "../../../utils/tasks/taskContext";
import { useState } from "react";
import { TaskActivity } from "../../../utils/tasks/taskTypes";

export const TasksHolder = () => {
    const [activity, setActivity] = useState<TaskActivity>(null);
    const breakpointColumnsObj = {
        default: 4,
        1024: 3,
        768: 2,
        500: 1,
    };
    const res = useTasksContext();
    return (
        <div>
            <TaskListAdder onTaskListAdded={(title) => { res.createList(title); triggerScreenBob(); }} />
            <Masonry breakpointCols={breakpointColumnsObj} className="flex gap-4" columnClassName="flex flex-col gap-4">
                {res.tasks.map((list) => (
                    <section className="bg-[#1f2335] p-5 rounded-md shadow-md shadow-black/30 border border-[#2a2f47] fade-in" key={list.id}>
                        <TaskList
                            allTasks={res.tasks}
                            goesToLabel={res.getGoesTo(list.nextId)}
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