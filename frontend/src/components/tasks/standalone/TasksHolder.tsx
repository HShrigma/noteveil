import TaskList from "./TaskList";
import Masonry from "react-masonry-css";
import { triggerScreenBob, triggerScreenShake } from "../../../utils/screenShake";
import TaskListAdder from "./compositional/TaskListAdder";
import { useTasksContext } from "../../../utils/tasks/taskContext";
import { useState } from "react";
import { TaskActivity } from "../../../utils/tasks/taskTypes";
import { getIndex, getTaskIndex } from "../../../utils/tasks/tasksHelper";
import { discardMsgTask, discardMsgTaskAdder, discardMsgTaskBottomBar, discardMsgTaskTitle } from "../../../utils/registries";
import { tryCancelDiscard } from "../../../utils/activityHelper";

export const TasksHolder = () => {
    const [activeTask, setActiveTask] = useState<TaskActivity>(null);
    const breakpointColumnsObj = {
        default: 4,
        1024: 3,
        768: 2,
        500: 1,
    };
    const res = useTasksContext();

    const requestActivity = (req: TaskActivity) => {
        if (activeTask === null || req === null) {
            setActiveTask(req);
            return;
        }
        if( activeTask.type === "adder" && req.type === activeTask.type){
            setActiveTask(req);
            return;
        }
        if (activeTask.type !== "adder" && activeTask.type !== "task" && activeTask.type === req.type && activeTask.listId === req.listId) {
            setActiveTask(req);
            return;
        }
        if (activeTask.type === "goesTo") {
            setActiveTask(req);
            return;
        }
        if(activeTask.type === "task" && req.type === "task" && activeTask.listId === req.listId && activeTask.taskId === req.taskId){
            setActiveTask(req);
            return;
        }
        const predicate = getPredicateForActiveTask();
        const msg = getDiscardMsgForActiveTask();
        if(tryCancelDiscard(predicate,msg)) return;
        setActiveTask(req);
    }

        const getPredicateForActiveTask = () => {
            if(activeTask?.type === "task" || activeTask?.type === "title"){
                const list = res.tasks[getIndex(activeTask.listId, res.tasks)];
                if(!list) return false;
                if(activeTask.type === "title") return activeTask.value.trim() !== list.title.trim();
                
                const task = list.tasks[getTaskIndex(list,activeTask.taskId)];
                if(!task) return false;
                return activeTask.value.trim() !== task.label.trim();
            }
            return activeTask !== null && activeTask.type !== "goesTo" && activeTask.value.trim() !== "";
        }
        const getDiscardMsgForActiveTask = () => {
            switch(activeTask?.type)
            {
                case "adder": return discardMsgTaskAdder;
                case "bottomBar": return discardMsgTaskBottomBar;
                case "task": return discardMsgTask;
                case "title": return discardMsgTaskTitle;
                default:
                    console.error(`Message not found for type ${activeTask ? activeTask.type : "none"}`);
                    return "";
            }
        }
    return (
        <div>
            <TaskListAdder
                isActive={activeTask?.type === "adder"}
                onTaskListAdded={(title) => { res.createList(title); triggerScreenBob(); }}
                onActivityRequest={(wantsActive, value) => { requestActivity(wantsActive ? { type: "adder", value: value ?? "" } : null) }} />
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
                            onTaskAdded={(id, label) => { res.createTask(id, label); triggerScreenBob(150); }}
                            onTaskRemoved={res.removeTask}
                            onTitleSubmitted={(id, title) => { res.updateTitle(id, title); triggerScreenBob(200); }}
                            onDeleted={(id) => { res.removeList(id); triggerScreenShake(); }}
                            onGoesTo={res.updateGoesTo}
                        />
                    </section>
                ))}
            </Masonry>
        </div>
    );
};

export default TasksHolder;