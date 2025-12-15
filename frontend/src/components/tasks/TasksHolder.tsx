import TaskList from "./model/TaskList";
import Masonry from "react-masonry-css";
import { triggerScreenBob, triggerScreenShake } from "../../utils/screenShake";
import TaskListAdder from "./model/compositional/TaskListAdder";
import { useTask } from "../../utils/tasks/useTask";

export const TasksHolder = () => {
    const breakpointColumnsObj = {
        default: 4,
        1024: 3,
        768: 2,
        500: 1,
    };
    const {allTasks, updateTaskDone, updateTaskLabel, createTask, removeTask, removeList, updateTitle, createList, updateGoesTo, getGoesTo} = useTask();

    return (
        <div>
            <TaskListAdder onTaskListAdded={(title) => { createList; triggerScreenBob(); }} />
            <Masonry breakpointCols={breakpointColumnsObj} className="flex gap-4" columnClassName="flex flex-col gap-4">
                {allTasks.map((list) => (
                    <section className="bg-[#1f2335] p-5 rounded-md shadow-md shadow-black/30 border border-[#2a2f47] fade-in" key={list.id}>
                        <TaskList
                            allTasks={allTasks}
                            goesToLabel={getGoesTo(list.nextId)}
                            data={list}
                            onTaskSubmit={updateTaskLabel}
                            onTaskDoneChanged={updateTaskDone}
                            onTaskAdded={(id,label)=>{createTask(id,label); triggerScreenBob(150);}}
                            onTaskRemoved={removeTask}
                            onTitleSubmitted={(id, title) => { updateTitle(id,title); triggerScreenBob(200); }}
                            onDeleted={(id) => {removeList(id); triggerScreenShake();}}
                            onGoesTo={updateGoesTo}
                        />
                    </section>
                ))}
            </Masonry>
        </div>
    );
};

export default TasksHolder;