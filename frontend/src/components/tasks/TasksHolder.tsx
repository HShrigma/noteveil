import { useEffect, useState } from "react";
import TaskList from "./model/TaskList";
import Masonry from "react-masonry-css";
import { triggerScreenBob, triggerScreenShake } from "../../utils/screenShake";
import TaskListAdder from "./model/compositional/TaskListAdder";
import { addList, addTask, deleteTask, deleteTaskList, fetchTasks, patchNextId } from "../../api/tasksApi";
import { TaskListData } from "../../utils/types";

export const TasksHolder = () => {
    const breakpointColumnsObj = {
        default: 4,
        1024: 3,
        768: 2,
        500: 1,
    };
    const [allTasks, setAllTasks] = useState<TaskListData[]>([]);

    const [maxId, setMaxId] = useState(0);
    const [maxTaskId, setMaxTaskId] = useState(0);

    useEffect(() => {
        fetchTasks().then((data) => {
            setAllTasks(data);

            // compute max list id
            const highestListId = data.reduce((max: number, list: { id: number }) => Math.max(max, list.id), 0);

            // compute max task id from all tasks
            const highestTaskId = data.reduce((max: number, list: { tasks: any[] }) => Math.max(max, ...list.tasks.map((t) => t.id)), 0);

            setMaxId(highestListId + 1);
            setMaxTaskId(highestTaskId + 1);
        });
    }, []);

    const setNewList = (newTaskList: TaskListData) => setAllTasks((prev) => prev.map((t) => (t.id === newTaskList.id ? newTaskList : t)));
    const getTaskListIndexById = (id: number) => {
        return allTasks.findIndex((t) => t.id === id);
    };
    const getTaskListById = (id: number) => {
        return { ...allTasks[getTaskListIndexById(id)] };
    };

    const handleTaskDoneChanged = (id: number, taskId: number, done: boolean) => {
        const newTaskList = getTaskListById(id);
        const taskIndex = newTaskList.tasks.findIndex((t) => t.id === taskId);
        if (taskIndex === -1) return;
        const newTask = { ...newTaskList.tasks[taskIndex], done };
        newTaskList.tasks[taskIndex] = newTask;

        // move to next list if nextId set
        if (newTaskList.nextId && done) {
            addNewTask(newTaskList.nextId, newTask.label);
            removeTask(newTaskList.id, taskId);
            return;
        }

        setNewList(newTaskList);
    };

    const handleTaskSubmit = (id: number, taskId: number, label: string) => {
        const newTaskList = getTaskListById(id);
        const taskIndex = newTaskList.tasks.findIndex((t) => t.id === taskId);
        if (taskIndex === -1) return;

        const newTask = { ...newTaskList.tasks[taskIndex], label };
        newTaskList.tasks[taskIndex] = newTask;

        setNewList(newTaskList);
    };

    async function addNewTask(id: number, label: string) {
        const newTaskList = getTaskListById(id);
        // create new task locally (label may be empty, starts in editing mode)
        newTaskList.tasks.push({ id: maxTaskId, label, done: false });
        setNewList(newTaskList);
        setMaxTaskId((n) => n + 1);
        triggerScreenBob(150);

        await addTask(id, maxTaskId, label);
    }

    async function removeTask(id: number, taskId: number) {
        const newTaskList = getTaskListById(id);
        newTaskList.tasks = newTaskList.tasks.filter((t) => t.id !== taskId);
        setNewList(newTaskList);

        await deleteTask(id, taskId);
    }

    async function removeList(id: number) {
        const newTasks = [...allTasks];
        setAllTasks(newTasks.filter((task) => task.id != id));
        triggerScreenShake();
        await deleteTaskList(id);
    }

    const submitTaskTitle = (id: number, value: string) => {
        triggerScreenBob(200);
        const newTaskList = getTaskListById(id);
        newTaskList.title = value;

        setNewList(newTaskList);
    };

    async function addTaskList(title: string) {
        const newTasks = [...allTasks];
        newTasks.push({ id: maxId, title, tasks: [] });
        setMaxId((n) => n + 1);
        setAllTasks(newTasks);
        triggerScreenBob();

        await addList(maxId, title);
    }

    async function editGoesTo(id: number, nextId: number) {
        const newTaskList = getTaskListById(id);
        newTaskList.nextId = nextId === -1 ? undefined : nextId;
        setNewList(newTaskList);

        await patchNextId(id, newTaskList.nextId);
    };

    return (
        <div>
            <TaskListAdder onTaskListAdded={addTaskList} />
            <Masonry breakpointCols={breakpointColumnsObj} className="flex gap-4" columnClassName="flex flex-col gap-4">
                {allTasks.map((task) => (
                    <section className="bg-[#1f2335] p-5 rounded-md shadow-md shadow-black/30 border border-[#2a2f47] fade-in" key={task.id}>
                        <TaskList
                            allTasks={allTasks}
                            data={task}
                            onTaskSubmit={handleTaskSubmit}
                            onTaskDoneChanged={handleTaskDoneChanged}
                            onTaskAdded={addNewTask}
                            onTaskRemoved={removeTask}
                            onTitleSubmitted={submitTaskTitle}
                            onDeleted={removeList}
                            onGoesTo={editGoesTo}
                        />
                    </section>
                ))}
            </Masonry>
        </div>
    );
};

export default TasksHolder;

