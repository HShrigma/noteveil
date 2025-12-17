import TaskList from "./TaskList";
import Masonry from "react-masonry-css";
import { triggerScreenBob, triggerScreenShake } from "../../../utils/screenShake";
import TaskListAdder from "./compositional/TaskListAdder";
import { useTaskManagerContext } from "../../../utils/tasks/taskManagerContext";

export const TasksHolder = () => {
    const breakpointColumnsObj = {
        default: 4,
        1024: 3,
        768: 2,
        500: 1,
    };
    const ctx = useTaskManagerContext();
    return (
        <div>
            <TaskListAdder
                isActive={ctx.isActive("adder")}
                onTaskListAdded={(title) => { ctx.createList(title); triggerScreenBob(); }} />
            <Masonry breakpointCols={breakpointColumnsObj} className="flex gap-4" columnClassName="flex flex-col gap-4">
                {ctx.tasks.map((list) => (
                    <section className="bg-[#1f2335] p-5 rounded-md shadow-md shadow-black/30 border border-[#2a2f47] " key={list.id}>
                        <TaskList
                            goesToLabel={ctx.getGoesTo(list.nextId)}
                            data={list}
                            onTitleSubmitted={(id, title) => { ctx.updateTitle(id, title); triggerScreenBob(200); }}
                            onGoesTo={ctx.updateGoesTo}
                        />
                    </section>
                ))}
            </Masonry>
        </div>
    );
};

export default TasksHolder;